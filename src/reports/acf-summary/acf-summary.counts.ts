import {
  isDiagnosed,
  isInitiated,
  isInvestigated,
  type PresumptiveTbRow,
} from '../../registers/presumptive-tb/presumptive-tb.types';

/** A register row with the ETL's bacteriological confirmation flag */
export type AcfCase = PresumptiveTbRow & { bact_confirmed?: number | string | null };

/** The department the register's cases are counted under: its TB assessment encounters (331) */
export const COUNTED_DEPARTMENT = 'TB / Chest Clinic';

const isBactConfirmed = (row: AcfCase) => isDiagnosed(row) && Number(row.bact_confirmed) === 1;

/**
 * The ACF indicators counted from the Presumptive TB Register's rows, by the
 * indicator's number on the form, each with the cases it counts. The ones the
 * register cannot give (workload, screened, respiratory conditions) are absent
 * and stay blank.
 */
export const ACF_INDICATORS: Record<number, { label: string; counts: (row: AcfCase) => boolean }> = {
  4: { label: 'Presumptive TB cases investigated for TB disease', counts: isInvestigated },
  5: { label: 'Presumptive TB cases diagnosed with TB', counts: isDiagnosed },
  6: { label: 'Presumptive cases Bact. confirmed with TB', counts: isBactConfirmed },
  7: {
    label: 'Presumptive cases diagnosed with TB clinically',
    counts: (row) => isDiagnosed(row) && !isBactConfirmed(row),
  },
  8: { label: 'Diagnosed TB cases initiated on treatment', counts: isInitiated },
};

export function acfCounts(rows: AcfCase[]): Record<number, number> {
  return Object.fromEntries(
    Object.entries(ACF_INDICATORS).map(([number, indicator]) => [number, rows.filter(indicator.counts).length]),
  );
}
