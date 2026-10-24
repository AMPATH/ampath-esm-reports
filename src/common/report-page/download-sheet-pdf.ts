/** A4 portrait, in millimetres */
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

/** Capture resolution: 3 device pixels per CSS pixel keeps 5.5pt type sharp */
const PIXEL_RATIO = 3;

/** Waits for the browser to lay out and paint a change */
const nextPaint = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

/**
 * Saves an A4 sheet as a one-page A4 PDF file.
 *
 * The sheet is captured as drawn on screen and placed on the page within the
 * given margin, scaled down only if it would not otherwise fit, so the file is
 * the form itself rather than the browser's print layout (no headers, footers
 * or print dialog).
 *
 * What is captured is a copy laid out off screen at paper size, without the
 * on-screen magnification (`--page-zoom`), so the sheet the user is looking at
 * never changes while the file is prepared -- and a sheet in a hidden tab can
 * be saved without showing it.
 */
export async function downloadSheetPdf(sheet: HTMLElement, fileName: string, marginMm = 8): Promise<void> {
  const [{ toCanvas }, { jsPDF }] = await Promise.all([import('html-to-image'), import('jspdf')]);

  const stage = document.createElement('div');
  stage.setAttribute('aria-hidden', 'true');
  Object.assign(stage.style, { position: 'fixed', top: '0', left: '-100000px', pointerEvents: 'none' });
  const copy = sheet.cloneNode(true) as HTMLElement;
  copy.style.setProperty('--page-zoom', '1');
  copy.style.margin = '0';
  stage.appendChild(copy);
  document.body.appendChild(stage);

  let canvas: HTMLCanvasElement;
  try {
    await nextPaint();
    canvas = await toCanvas(copy, {
      pixelRatio: PIXEL_RATIO,
      backgroundColor: '#fff',
      width: copy.offsetWidth,
      height: copy.offsetHeight,
    });
  } finally {
    stage.remove();
  }

  const maxWidth = A4_WIDTH_MM - 2 * marginMm;
  const maxHeight = A4_HEIGHT_MM - 2 * marginMm;
  const aspect = canvas.width / canvas.height;
  const width = Math.min(maxWidth, maxHeight * aspect);
  const height = width / aspect;

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  pdf.addImage(canvas, 'PNG', (A4_WIDTH_MM - width) / 2, marginMm, width, height, undefined, 'FAST');
  pdf.save(fileName);
}
