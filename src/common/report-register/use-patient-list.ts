import { useCallback, useEffect, useRef, useState } from 'react';

import { PAGE_SIZE, type PatientListPage } from '../../resources/patient-list-page';
import { showReportError } from '../report-error';

type Fetcher = (paging: { startIndex: number; limit: number }) => Promise<PatientListPage>;

/**
 * Page state and fetching for a register's line list.
 *
 * Registers used to ask for a hardcoded 300 rows and render every one of them.
 * At 41 columns that is 12,300 cells, and anything past 300 was silently
 * dropped. This fetches a page at a time, so the DOM stays flat however large
 * the list is, and reports the total so truncation is never invisible.
 */
export function usePatientList(fetcher: Fetcher, deps: React.DependencyList) {
  const [rows, setRows] = useState<Array<Record<string, any>>>([]);
  const [total, setTotal] = useState(0);
  const [isTotalExact, setIsTotalExact] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  /* Guards against an earlier page landing after a later one and overwriting
     it, which is easy to trigger by clicking through pages quickly. */
  const request = useRef(0);

  const load = useCallback(
    async (nextPage: number, size: number) => {
      const id = ++request.current;

      setIsLoading(true);

      try {
        const result = await fetcher({ startIndex: (nextPage - 1) * size, limit: size });

        if (id !== request.current) {
          return;
        }

        setRows(result.results);
        setTotal(result.total);
        setIsTotalExact(result.isTotalExact);
      } catch (error) {
        if (id === request.current) {
          setRows([]);
          showReportError('the register', error);
        }
      } finally {
        if (id === request.current) {
          setIsLoading(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );

  /** Back to page one whenever the query behind the list changes */
  useEffect(() => {
    setPage(1);
    load(1, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const onPageChange = useCallback(
    ({ page: nextPage, pageSize: nextSize }: { page: number; pageSize: number }) => {
      setPage(nextPage);
      setPageSize(nextSize);
      load(nextPage, nextSize);
    },
    [load],
  );

  /** Every row across every page, for the CSV export */
  const fetchAll = useCallback(async () => {
    const all: Array<Record<string, any>> = [];
    const size = 500;

    for (let index = 0; ; index += size) {
      const result = await fetcher({ startIndex: index, limit: size });
      all.push(...result.results);

      if (result.results.length < size) {
        return all;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { rows, total, isTotalExact, isLoading, page, pageSize, onPageChange, fetchAll };
}
