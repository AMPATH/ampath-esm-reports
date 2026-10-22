import { useCallback, useEffect, useRef, useState } from 'react';

/** A4 portrait width */
const A4_WIDTH_MM = 210;

/** Millimetres to CSS pixels at the reference 96dpi */
const mmToPx = (mm: number) => (mm * 96) / 25.4;

/**
 * Scales the sheet to fill whatever width it is given, never going below A4.
 *
 * The report is drawn at true A4 so it prints at 1:1, but a fixed page wastes
 * most of a wide monitor and is hard to read. This measures the containing
 * element and returns the factor that makes the page fill it, floored at 1 so
 * the sheet is never rendered smaller than the paper it represents -- below
 * that width the container scrolls instead, which keeps the form legible rather
 * than shrinking it into illegibility.
 *
 * A callback ref rather than `useRef` + `useEffect`, because the page it
 * measures only mounts once a report has been generated: a mount effect would
 * run while the placeholder is still showing, find nothing to measure, and
 * never run again -- leaving the generated sheet stuck at A4.
 *
 * Returned as a factor for `zoom`, which scales the layout box as well as the
 * paint, so the scroll container stays the right size around the page.
 *
 * `pageWidthMm` is the width of the sheet as drawn on screen: the full A4 by
 * default, or less for a sheet drawn without its paper margins (they are added
 * back only for print).
 */
export function usePageScale<T extends HTMLElement>(pageWidthMm = A4_WIDTH_MM) {
  const [scale, setScale] = useState(1);
  const observer = useRef<ResizeObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      observer.current?.disconnect();

      if (!node) {
        return;
      }

      const measure = () => {
        // clientWidth excludes the scrollbar, so the page cannot chase a
        // scrollbar it has just caused
        setScale(Math.max(1, node.clientWidth / mmToPx(pageWidthMm)));
      };

      measure();

      observer.current = new ResizeObserver(measure);
      observer.current.observe(node);
    },
    [pageWidthMm],
  );

  useEffect(() => () => observer.current?.disconnect(), []);

  return { ref, scale };
}
