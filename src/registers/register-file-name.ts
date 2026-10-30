import dayjs from 'dayjs';

/**
 * A register's PDF file name: its code, the facility and the period, e.g.
 * `MOH-267_Kesses_2026-09.pdf` for a whole month, or
 * `MOH-267_Kesses_2026-10-01_to_2026-10-28.pdf` for any other range.
 */
export function registerFileName(code: string, facility: string, period: { startDate: string; endDate: string }) {
  const start = dayjs(period.startDate);
  const end = dayjs(period.endDate);
  const isWholeMonth = start.isSame(start.startOf('month'), 'day') && end.isSame(start.endOf('month'), 'day');
  const range = isWholeMonth ? start.format('YYYY-MM') : `${start.format('YYYY-MM-DD')}_to_${end.format('YYYY-MM-DD')}`;
  const name = [code, facility, period.startDate ? range : '']
    .filter(Boolean)
    .join('_')
    .replace(/[^a-z0-9_-]+/gi, '-');
  return `${name}.pdf`;
}
