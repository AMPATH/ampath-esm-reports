import { useCallback, useEffect, useMemo, useState } from 'react';

import { type LinelistColumn } from './linelist-columns';

interface ColumnLayout {
  /** Column headers in display order */
  order: string[];
  hidden: string[];
}

const storageKeyFor = (key: string) => `ampath-linelist-layout:${key}`;

function readLayout(key: string): ColumnLayout | null {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKeyFor(key)) ?? 'null');
    return saved && Array.isArray(saved.order) && Array.isArray(saved.hidden) ? saved : null;
  } catch {
    return null;
  }
}

function writeLayout(key: string, layout: ColumnLayout | null) {
  try {
    if (layout) {
      localStorage.setItem(storageKeyFor(key), JSON.stringify(layout));
    } else {
      localStorage.removeItem(storageKeyFor(key));
    }
  } catch {
    /* storage unavailable (private window, blocked site data): the layout just isn't remembered */
  }
}

const defaultLayout = (columns: LinelistColumn[]): ColumnLayout => ({
  order: columns.map((column) => column.header),
  hidden: columns.filter((column) => column.hidden).map((column) => column.header),
});

/**
 * The order and visibility of a linelist's columns, remembered per linelist in
 * this browser.
 *
 * The saved layout is reconciled with the configured columns every time, so a
 * column added to the configuration later still appears (at the end), and one
 * removed from it is dropped from the layout rather than breaking it.
 */
export function useColumnLayout(columns: LinelistColumn[], storageKey: string) {
  const [layout, setLayout] = useState<ColumnLayout>(() => readLayout(storageKey) ?? defaultLayout(columns));

  useEffect(() => {
    setLayout(readLayout(storageKey) ?? defaultLayout(columns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const byHeader = useMemo(() => new Map(columns.map((column) => [column.header, column])), [columns]);

  /** Every configured column, in the user's order */
  const ordered = useMemo(() => {
    const known = layout.order.filter((header) => byHeader.has(header));
    const added = columns.map((column) => column.header).filter((header) => !known.includes(header));
    return [...known, ...added].map((header) => byHeader.get(header)!);
  }, [layout.order, byHeader, columns]);

  const isVisible = useCallback((header: string) => !layout.hidden.includes(header), [layout.hidden]);
  const visible = useMemo(() => ordered.filter((column) => isVisible(column.header)), [ordered, isVisible]);

  const update = useCallback(
    (next: ColumnLayout) => {
      setLayout(next);
      writeLayout(storageKey, next);
    },
    [storageKey],
  );

  const toggle = useCallback(
    (header: string) => {
      const hidden = layout.hidden.includes(header)
        ? layout.hidden.filter((item) => item !== header)
        : [...layout.hidden, header];
      update({ order: ordered.map((column) => column.header), hidden });
    },
    [layout.hidden, ordered, update],
  );

  /** Moves `header` to where `target` is, shifting the columns between them */
  const move = useCallback(
    (header: string, target: string) => {
      const order = ordered.map((column) => column.header).filter((item) => item !== header);
      const at = order.indexOf(target);
      if (at === -1 || header === target) {
        return;
      }
      const from = ordered.findIndex((column) => column.header === header);
      const to = ordered.findIndex((column) => column.header === target);
      order.splice(from < to ? at + 1 : at, 0, header);
      update({ order, hidden: layout.hidden });
    },
    [ordered, layout.hidden, update],
  );

  /** Moves a column one place left (-1) or right (1) */
  const shift = useCallback(
    (header: string, step: -1 | 1) => {
      const index = ordered.findIndex((column) => column.header === header);
      const target = ordered[index + step];
      if (target) {
        move(header, target.header);
      }
    },
    [ordered, move],
  );

  const reset = useCallback(() => {
    writeLayout(storageKey, null);
    setLayout(defaultLayout(columns));
  }, [storageKey, columns]);

  const isCustomised =
    JSON.stringify({ order: ordered.map((column) => column.header), hidden: layout.hidden }) !==
    JSON.stringify(defaultLayout(columns));

  return { ordered, visible, isVisible, toggle, move, shift, reset, isCustomised };
}
