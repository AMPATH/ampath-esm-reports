import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { describePeriod } from './date-range';
import { type ReportPeriod } from './types';

/**
 * Regenerates a report when its URL carries a period.
 *
 * A register's breadcrumb links back to the report the figure came from, and
 * carries the period it was generated for. Without this the user lands on the
 * report's "not generated yet" placeholder and has to pick the same month
 * again -- the trail leads back to the page but not to what was on it.
 *
 * Reports that keep their figures in session storage restore themselves
 * already; this is for the ones that do not.
 */
export function useRestorePeriod(onRestore: (period: ReportPeriod) => void) {
  const [searchParams, setSearchParams] = useSearchParams();

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const month = searchParams.get('month') ?? undefined;
  const shouldRegenerate = searchParams.get('regen') === '1';

  /* Keyed on the period rather than a bare "has run" flag, so following a
     second register back to a different month still regenerates. A breadcrumb
     back from a drill-down adds `regen=1` to force a fresh fetch even when the
     same period is being revisited. */
  const restored = useRef<string | null>(null);
    const forcedRestore = useRef<string | null>(null);

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }

    const key = `${startDate}|${endDate}`;

    if (restored.current === key && (!shouldRegenerate || forcedRestore.current === key)) {
      return;
    }

    restored.current = key;
    if (shouldRegenerate) {
      forcedRestore.current = key;
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('regen');
      setSearchParams(nextParams, { replace: true });
    }
    onRestore({ startDate, endDate, month, label: describePeriod(startDate, endDate, month) });
  }, [startDate, endDate, month, shouldRegenerate, onRestore, searchParams, setSearchParams]);
}
