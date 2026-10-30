import { useEffect, useRef, useState } from 'react';

import { type PatientListPage } from '../../resources/patient-list-page';
import { showReportError } from '../report-error';

type Fetcher = (paging: { startIndex: number; limit: number }) => Promise<PatientListPage>;

const BATCH_SIZE = 500;

/* Figures of a total loaded at once, so a large total is not one long queue
   yet the ETL server is not sent every figure's query together */
const PARALLEL_FIGURES = 4;

/**
 * Every row of a linelist, fetched in batches.
 *
 * Sorting, filtering and export all have to see the whole list: sorting one
 * server page of 50 would present the top of that page as the top of the list.
 * A figure's linelist is one facility's clients for one month, so holding it
 * in memory is cheap; only the page on screen is rendered.
 *
 * Given several fetchers -- a total made of separate figures -- they are read a
 * few at a time, and their rows listed one figure after another.
 */
export function useAllRows(fetcher: Fetcher | Fetcher[], deps: React.DependencyList) {
  const [rows, setRows] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  /* A newer query supersedes one still loading, so its batches are discarded */
  const request = useRef(0);

  useEffect(() => {
    const id = ++request.current;

    setRows([]);
    setLoadedCount(0);
    setIsLoading(true);

    (async () => {
      const fetchers = Array.isArray(fetcher) ? fetcher : [fetcher];
      /* each figure's rows kept apart, so the list keeps the figures' order */
      const byFigure: Array<Array<Record<string, any>>> = fetchers.map(() => []);
      let loaded = 0;
      let next = 0;

      const readFigure = async (index: number) => {
        for (let startIndex = 0; ; startIndex += BATCH_SIZE) {
          const page = await fetchers[index]({ startIndex, limit: BATCH_SIZE });

          if (id !== request.current) {
            return;
          }

          byFigure[index].push(...page.results);
          loaded += page.results.length;
          setLoadedCount(loaded);

          if (page.results.length < BATCH_SIZE) {
            return;
          }
        }
      };

      const worker = async () => {
        while (next < fetchers.length && id === request.current) {
          await readFigure(next++);
        }
      };

      try {
        await Promise.all(Array.from({ length: Math.min(PARALLEL_FIGURES, fetchers.length) }, worker));

        if (id !== request.current) {
          return;
        }

        setRows(byFigure.flat());
      } catch (error) {
        if (id === request.current) {
          showReportError('the linelist', error);
        }
      } finally {
        if (id === request.current) {
          setIsLoading(false);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { rows, isLoading, loadedCount };
}
