import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/** A linelist made of several figures, e.g. a total on the Summary tab */
export interface Moh731LinelistTotal {
  /** The figures it is made of, by code; they must not overlap */
  codes: string[];
  /** Heading, e.g. `Total tests` */
  label: string;
  /** The sub-section it totals, e.g. `1.1 HIV Tests` */
  block: string;
}

/**
 * Opens the linelist behind a figure on the MOH 731 sheet, by the code printed
 * beside it (e.g. `HV01-03`), or behind a total made of several figures. What a
 * code lists is defined in `moh-731-indicators.ts`. `view` is the report tab it
 * was opened from, and `section` the Summary section tab, so the breadcrumb
 * returns to them.
 */
export function useOpenMoh731Linelist(
  startDate: string,
  endDate: string,
  locationUuids: string,
  view?: 'summary',
  section?: string,
) {
  const navigate = useNavigate();

  return useCallback(
    (figure: string | Moh731LinelistTotal) => {
      const params = new URLSearchParams({ startDate, endDate, locationUuids, from: 'moh-731' });
      if (typeof figure === 'string') {
        params.set('code', figure);
      } else {
        params.set('codes', figure.codes.join(','));
        params.set('label', figure.label);
        params.set('block', figure.block);
      }
      if (view) {
        params.set('view', view);
      }
      if (section) {
        params.set('section', section);
      }
      navigate(`/moh-731-linelist?${params}`);
    },
    [navigate, startDate, endDate, locationUuids, view, section],
  );
}
