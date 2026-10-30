import type { toCanvas as ToCanvas } from 'html-to-image';

/** Paper sizes, in millimetres, portrait */
const PAPER_MM = {
  a4: { width: 210, height: 297 },
  a3: { width: 297, height: 420 },
};

export type PaperSize = keyof typeof PAPER_MM;
export type PageOrientation = 'portrait' | 'landscape';

/** Capture resolution: 3 device pixels per CSS pixel keeps 5.5pt type sharp */
const PIXEL_RATIO = 3;

/**
 * Pages stored as JPEG are captured at 2.5 device pixels per CSS pixel (some
 * 240 dpi on paper) and quality 0.8: 3.6pt type stays crisp, and a page is
 * about 0.7MB rather than 1.1MB at 3x and 0.92
 */
const JPEG_PIXEL_RATIO = 2.5;
const JPEG_QUALITY = 0.8;

/** Waits for the browser to lay out and paint a change */
const nextPaint = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

/**
 * A copy of a sheet at paper size, without the on-screen magnification
 * (`--page-zoom`), laid out off screen: the sheet the user is looking at never
 * changes while the file is prepared, and a sheet in a hidden tab, which has
 * no size of its own, can be measured and saved without showing it.
 */
const stageCopy = (sheet: HTMLElement) => {
  const stage = document.createElement('div');
  stage.setAttribute('aria-hidden', 'true');
  Object.assign(stage.style, { position: 'fixed', top: '0', left: '-100000px', pointerEvents: 'none' });
  const copy = sheet.cloneNode(true) as HTMLElement;
  copy.style.setProperty('--page-zoom', '1');
  copy.style.margin = '0';
  stage.appendChild(copy);
  document.body.appendChild(stage);
  return { stage, copy };
};

/**
 * Captures a sheet by copying every element's computed style onto the capture,
 * so it works for any sheet, web fonts included.
 */
async function captureWithComputedStyles(
  sheet: HTMLElement,
  toCanvas: typeof ToCanvas,
  fontEmbedCSS: string,
  pixelRatio: number,
): Promise<HTMLCanvasElement> {
  const { stage, copy } = stageCopy(sheet);

  try {
    await nextPaint();
    return await toCanvas(copy, {
      pixelRatio,
      backgroundColor: '#fff',
      width: copy.offsetWidth,
      height: copy.offsetHeight,
      fontEmbedCSS,
    });
  } finally {
    stage.remove();
  }
}

/**
 * The page's own CSS rules that can apply to the sheets: those naming a class
 * used in them, and the element-only rules (the styleguide's reset), within
 * the media queries that hold now.
 */
function sheetStyles(sheets: HTMLElement[]): string {
  const classes = new Set<string>();
  for (const sheet of sheets) {
    for (const element of [sheet, ...Array.from(sheet.querySelectorAll('[class]'))]) {
      element.classList.forEach((name) => classes.add(`.${CSS.escape(name)}`));
    }
  }
  const classList = Array.from(classes);

  const rules: string[] = [];
  const keep = (rule: CSSRule) => {
    if (rule instanceof CSSStyleRule) {
      const selector = rule.selectorText;
      if (!/[.#]/.test(selector) || classList.some((name) => selector.includes(name))) {
        rules.push(rule.cssText);
      }
    } else if (rule instanceof CSSMediaRule && window.matchMedia(rule.conditionText).matches) {
      Array.from(rule.cssRules).forEach(keep);
    }
  };
  for (const styleSheet of Array.from(document.styleSheets)) {
    let sheetRules: CSSRuleList;
    try {
      sheetRules = styleSheet.cssRules;
    } catch {
      // a stylesheet from another origin cannot be read, and styles no sheet
      continue;
    }
    Array.from(sheetRules).forEach(keep);
  }
  return rules.join('\n');
}

/**
 * Captures a sheet styled wholly by the page's stylesheets and set in fonts
 * every computer has, by drawing its markup with those rules: some twenty times
 * quicker than copying every element's computed style, which matters for a
 * register of many pages. Web fonts would not load in the drawing.
 */
async function captureWithStylesheets(sheet: HTMLElement, css: string, pixelRatio: number): Promise<HTMLCanvasElement> {
  const { stage, copy } = stageCopy(sheet);
  const width = copy.offsetWidth;
  const height = copy.offsetHeight;
  stage.remove();

  const markup = new XMLSerializer().serializeToString(copy);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` +
    `<foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">` +
    `<style>${css.replace(/</g, '\\3c ')}</style>${markup}</div></foreignObject></svg>`;

  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await image.decode();

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * pixelRatio);
  canvas.height = Math.round(height * pixelRatio);
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('This browser cannot draw the page for the PDF');
  }
  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/**
 * Saves sheets as a PDF file, one sheet to a page: A4 unless another paper
 * size is given (the Presumptive TB Register is an A3 form).
 *
 * Each sheet is captured as drawn on screen and placed on its page within the
 * given margin, scaled down only if it would not otherwise fit, so the file is
 * the form itself rather than the browser's print layout (no headers, footers
 * or print dialog). Sheets are captured one at a time, so a long register does
 * not hold every page's image in memory at once.
 *
 * Two options keep a many-page file quick to make:
 * - `stylesheetsOnly`, for sheets styled wholly by the page's stylesheets and
 *   set in fonts every computer has (Arial, Georgia): each is drawn from its
 *   markup and those rules, in a fraction of a second rather than seconds.
 * - `image: 'jpeg'`: each page is stored as a JPEG rather than a PNG, which is
 *   many times quicker to put in the file and makes it smaller, with no
 *   visible loss in printed type.
 */
export async function downloadSheetsPdf(
  sheets: HTMLElement[],
  fileName: string,
  {
    paperSize = 'a4',
    orientation = 'portrait',
    marginMm = 8,
    stylesheetsOnly = false,
    image = 'png',
  }: {
    paperSize?: PaperSize;
    orientation?: PageOrientation;
    marginMm?: number;
    stylesheetsOnly?: boolean;
    image?: 'png' | 'jpeg';
  } = {},
): Promise<void> {
  if (!sheets.length) {
    return;
  }
  const [{ toCanvas, getFontEmbedCSS }, { jsPDF }] = await Promise.all([import('html-to-image'), import('jspdf')]);

  /* Rules and web fonts are gathered once for the whole file, not per page */
  const css = stylesheetsOnly ? sheetStyles(sheets) : '';
  const fontEmbedCSS = stylesheetsOnly ? '' : await getFontEmbedCSS(sheets[0]);

  const pixelRatio = image === 'jpeg' ? JPEG_PIXEL_RATIO : PIXEL_RATIO;
  const portrait = PAPER_MM[paperSize];
  const paper = orientation === 'portrait' ? portrait : { width: portrait.height, height: portrait.width };
  const maxWidth = paper.width - 2 * marginMm;
  const maxHeight = paper.height - 2 * marginMm;
  const pdf = new jsPDF({ orientation, unit: 'mm', format: paperSize, compress: true });

  for (const [index, sheet] of sheets.entries()) {
    const canvas = stylesheetsOnly
      ? await captureWithStylesheets(sheet, css, pixelRatio)
      : await captureWithComputedStyles(sheet, toCanvas, fontEmbedCSS, pixelRatio);
    const aspect = canvas.width / canvas.height;
    const width = Math.min(maxWidth, maxHeight * aspect);
    const height = width / aspect;

    if (index > 0) {
      pdf.addPage(paperSize, orientation);
    }
    const pageImage = image === 'jpeg' ? canvas.toDataURL('image/jpeg', JPEG_QUALITY) : canvas;
    pdf.addImage(
      pageImage,
      image === 'jpeg' ? 'JPEG' : 'PNG',
      (paper.width - width) / 2,
      marginMm,
      width,
      height,
      undefined,
      'FAST',
    );
  }

  pdf.save(fileName);
}

/** Saves an A4 sheet as a one-page A4 portrait PDF file */
export function downloadSheetPdf(sheet: HTMLElement, fileName: string, marginMm = 8): Promise<void> {
  return downloadSheetsPdf([sheet], fileName, { marginMm });
}
