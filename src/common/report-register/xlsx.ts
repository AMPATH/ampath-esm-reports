/**
 * A small Excel (.xlsx) writer for laying a report out as its paper form:
 * merged cells, bold headings, borders, shading and column widths -- what a
 * CSV file cannot hold. One sheet, text and numbers only.
 *
 * An .xlsx file is a zip of a few XML parts; they are stored uncompressed,
 * which every spreadsheet program reads, so no library is needed.
 *
 * Usage:
 *   const blob = buildXlsx({ sheetName: 'C&T', rows, merges: ['A1:F1'], columnWidths: [20, 30] });
 *   downloadBlob(blob, 'report.xlsx');
 */

/** How a cell looks; see STYLES for each */
export type XlsxStyle =
  | 'plain'
  | 'title'
  | 'meta'
  | 'header'
  | 'section'
  | 'group'
  | 'label'
  | 'labelStrong'
  | 'labelMuted'
  | 'labelItalic'
  | 'number'
  | 'numberStrong'
  | 'numberMuted'
  | 'notApplicable'
  | 'note';

export interface XlsxCell {
  value?: string | number;
  style?: XlsxStyle;
}

export interface XlsxSheet {
  sheetName: string;
  /** Row by row, column by column; a cell covered by a merge is left empty */
  rows: XlsxCell[][];
  /** Ranges to merge, e.g. `A1:C2` */
  merges?: string[];
  /** Each column's width, in characters */
  columnWidths?: number[];
  /** Rows (from the top) and columns (from the left) kept in view as the sheet scrolls */
  freeze?: { rows: number; columns: number };
}

/* fonts, fills and borders, referred to by index from STYLES */
const FONTS = [
  '<font><sz val="10"/><name val="Arial"/></font>',
  '<font><b/><sz val="10"/><name val="Arial"/></font>',
  '<font><b/><sz val="13"/><name val="Arial"/></font>',
  '<font><sz val="10"/><color rgb="FF6F6F6F"/><name val="Arial"/></font>',
  '<font><i/><sz val="10"/><color rgb="FF6F6F6F"/><name val="Arial"/></font>',
];
const FILLS = [
  '<fill><patternFill patternType="none"/></fill>',
  '<fill><patternFill patternType="gray125"/></fill>',
  '<fill><patternFill patternType="solid"><fgColor rgb="FFE8E8E8"/><bgColor indexed="64"/></patternFill></fill>',
  '<fill><patternFill patternType="solid"><fgColor rgb="FFF4F4F4"/><bgColor indexed="64"/></patternFill></fill>',
];
const thin =
  '<left style="thin"><color rgb="FF8D8D8D"/></left><right style="thin"><color rgb="FF8D8D8D"/></right><top style="thin"><color rgb="FF8D8D8D"/></top><bottom style="thin"><color rgb="FF8D8D8D"/></bottom>';
const BORDERS = ['<border><left/><right/><top/><bottom/><diagonal/></border>', `<border>${thin}<diagonal/></border>`];

/* each style: font, fill, border and alignment */
const STYLES: Record<XlsxStyle, { font: number; fill: number; border: number; align?: string }> = {
  plain: { font: 0, fill: 0, border: 0 },
  title: { font: 2, fill: 0, border: 0 },
  meta: { font: 1, fill: 0, border: 0 },
  header: { font: 1, fill: 2, border: 1, align: 'horizontal="center" vertical="center" wrapText="1"' },
  section: { font: 1, fill: 3, border: 1, align: 'vertical="center" wrapText="1"' },
  group: { font: 0, fill: 3, border: 1, align: 'vertical="center" wrapText="1"' },
  label: { font: 0, fill: 0, border: 1, align: 'vertical="center" wrapText="1"' },
  labelStrong: { font: 1, fill: 0, border: 1, align: 'vertical="center" wrapText="1"' },
  labelMuted: { font: 3, fill: 0, border: 1, align: 'vertical="center" wrapText="1"' },
  labelItalic: { font: 4, fill: 0, border: 1, align: 'vertical="center" wrapText="1"' },
  number: { font: 0, fill: 0, border: 1, align: 'horizontal="center" vertical="center"' },
  numberStrong: { font: 1, fill: 0, border: 1, align: 'horizontal="center" vertical="center"' },
  numberMuted: { font: 3, fill: 0, border: 1, align: 'horizontal="center" vertical="center"' },
  notApplicable: { font: 0, fill: 2, border: 1 },
  note: { font: 3, fill: 0, border: 0 },
};
const STYLE_ORDER = Object.keys(STYLES) as XlsxStyle[];

const escapeXml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** 0 -> A, 25 -> Z, 26 -> AA */
export function columnName(index: number): string {
  let name = '';
  for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) {
    name = String.fromCharCode(65 + ((n - 1) % 26)) + name;
  }
  return name;
}

/** A range from zero-based row and column numbers, e.g. (0, 0, 1, 2) -> A1:C2 */
export const rangeOf = (row: number, column: number, lastRow: number, lastColumn: number) =>
  `${columnName(column)}${row + 1}:${columnName(lastColumn)}${lastRow + 1}`;

function sheetXml({ rows, merges = [], columnWidths = [], freeze }: XlsxSheet): string {
  const cols = columnWidths.length
    ? `<cols>${columnWidths
        .map((width, index) => `<col min="${index + 1}" max="${index + 1}" width="${width}" customWidth="1"/>`)
        .join('')}</cols>`
    : '';
  const pane =
    freeze && (freeze.rows || freeze.columns)
      ? `<sheetViews><sheetView workbookViewId="0"><pane${freeze.columns ? ` xSplit="${freeze.columns}"` : ''}${
          freeze.rows ? ` ySplit="${freeze.rows}"` : ''
        } topLeftCell="${columnName(freeze.columns)}${freeze.rows + 1}" activePane="bottomRight" state="frozen"/></sheetView></sheetViews>`
      : '';
  const data = rows
    .map((cells, rowIndex) => {
      const xml = cells
        .map((cell, columnIndex) => {
          const ref = `${columnName(columnIndex)}${rowIndex + 1}`;
          const style = STYLE_ORDER.indexOf(cell?.style ?? 'plain');
          const value = cell?.value;
          if (value === undefined || value === '') {
            return `<c r="${ref}" s="${style}"/>`;
          }
          if (typeof value === 'number') {
            return `<c r="${ref}" s="${style}"><v>${value}</v></c>`;
          }
          return `<c r="${ref}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${escapeXml(value)}</t></is></c>`;
        })
        .join('');
      return `<row r="${rowIndex + 1}">${xml}</row>`;
    })
    .join('');
  const mergeXml = merges.length
    ? `<mergeCells count="${merges.length}">${merges.map((ref) => `<mergeCell ref="${ref}"/>`).join('')}</mergeCells>`
    : '';
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${pane}${cols}<sheetData>${data}</sheetData>${mergeXml}<pageSetup orientation="landscape"/></worksheet>`;
}

const stylesXml = () => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="${FONTS.length}">${FONTS.join('')}</fonts>
<fills count="${FILLS.length}">${FILLS.join('')}</fills>
<borders count="${BORDERS.length}">${BORDERS.join('')}</borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="${STYLE_ORDER.length}">${STYLE_ORDER.map((name) => {
  const { font, fill, border, align } = STYLES[name];
  return `<xf numFmtId="0" fontId="${font}" fillId="${fill}" borderId="${border}" xfId="0" applyFont="1" applyFill="1" applyBorder="1"${
    align ? ` applyAlignment="1"><alignment ${align}/></xf>` : '/>'
  }`;
}).join('')}</cellXfs>
</styleSheet>`;

const workbookXml = (sheetName: string) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${escapeXml(
  sheetName.replace(/[\\/?*[\]:]/g, ' ').slice(0, 31),
)}" sheetId="1" r:id="rId1"/></sheets></workbook>`;

const PARTS = {
  '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
  '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
  'xl/_rels/workbook.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
};

/* CRC-32, as a zip records for each file */
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
});
const crc32 = (bytes: Uint8Array) => {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
};

/** A zip of these files, stored uncompressed */
function zip(files: Array<{ name: string; data: Uint8Array<ArrayBuffer> }>): Blob {
  const encoder = new TextEncoder();
  const chunks: Uint8Array<ArrayBuffer>[] = [];
  const central: Uint8Array<ArrayBuffer>[] = [];
  let offset = 0;

  const header = (size: number) => {
    const buffer = new Uint8Array(size);
    return { buffer, view: new DataView(buffer.buffer) };
  };

  for (const file of files) {
    const name = encoder.encode(file.name);
    const crc = crc32(file.data);
    const size = file.data.length;

    const local = header(30 + name.length);
    local.view.setUint32(0, 0x04034b50, true);
    local.view.setUint16(4, 20, true);
    local.view.setUint16(8, 0, true); // stored
    local.view.setUint32(14, crc, true);
    local.view.setUint32(18, size, true);
    local.view.setUint32(22, size, true);
    local.view.setUint16(26, name.length, true);
    local.buffer.set(name, 30);

    const entry = header(46 + name.length);
    entry.view.setUint32(0, 0x02014b50, true);
    entry.view.setUint16(4, 20, true);
    entry.view.setUint16(6, 20, true);
    entry.view.setUint32(16, crc, true);
    entry.view.setUint32(20, size, true);
    entry.view.setUint32(24, size, true);
    entry.view.setUint16(28, name.length, true);
    entry.view.setUint32(42, offset, true);
    entry.buffer.set(name, 46);

    chunks.push(local.buffer, file.data);
    central.push(entry.buffer);
    offset += local.buffer.length + size;
  }

  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const end = header(22);
  end.view.setUint32(0, 0x06054b50, true);
  end.view.setUint16(8, files.length, true);
  end.view.setUint16(10, files.length, true);
  end.view.setUint32(12, centralSize, true);
  end.view.setUint32(16, offset, true);

  return new Blob([...chunks, ...central, end.buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}

/** The sheet as an .xlsx file */
export function buildXlsx(sheet: XlsxSheet): Blob {
  const encoder = new TextEncoder();
  const files = {
    ...PARTS,
    'xl/workbook.xml': workbookXml(sheet.sheetName),
    'xl/styles.xml': stylesXml(),
    'xl/worksheets/sheet1.xml': sheetXml(sheet),
  };
  return zip(Object.entries(files).map(([name, text]) => ({ name, data: encoder.encode(text) })));
}

/** Saves a file the browser has made */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
