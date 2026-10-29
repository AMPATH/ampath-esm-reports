import dayjs from 'dayjs';

import { type Moh267Row } from './moh-267.types';

/**
 * The figures in MOH 267's summary tables, counted from the register's visits
 * by MOH 731's PrEP rules (the visits and their flags come from the MOH 731
 * PrEP visits base):
 *
 * - Number initiated (New) on PrEP (g): visits flagged new (MOH 731 1.3).
 * - Number Current on PrEP (New + Refill + Restart): clients whose latest
 *   visit in the period is New, Continuing or Restart.
 * - Number diagnosed with STI (j): visits with an STI (MOH 731 1.4).
 * - Number Seroconverting while on PrEP (i): MOH 731 1.5.
 */

export const AGE_BANDS: Array<{ label: string; min: number; max?: number }> = [
  { label: '10 - 14 Yrs', min: 10, max: 14 },
  { label: '15 - 19 Yrs', min: 15, max: 19 },
  { label: '20 - 24 Yrs', min: 20, max: 24 },
  { label: '25 - 29 Yrs', min: 25, max: 29 },
  { label: '≥ 30 Yrs', min: 30 },
];

/** The populations of the age-by-sex tables, by the register's population type */
export const POPULATIONS = ['General Population', 'MSM/MSW', 'FSW', 'PWID/PWUD', 'Discordant Couple', 'VP'] as const;

export type Population = (typeof POPULATIONS)[number];
export type Sex = 'M' | 'F';

/** The PrEP methods across the method table, then its Total of every method */
export const METHODS = [
  'Event driven oral PrEP',
  'Daily oral PrEP',
  'Dapivirine Vaginal ring',
  'Cabotegravir Injectable',
] as const;

const inBand = (row: Moh267Row, band: { min: number; max?: number }) => {
  const age = Number(row.age);
  return row.age !== null && row.age !== undefined && row.age !== '' && Number.isFinite(age)
    ? age >= band.min && (band.max === undefined || age <= band.max)
    : false;
};

/** Each client's latest visit in the period */
const latestPerClient = (rows: Moh267Row[]) => {
  const latest = new Map<unknown, Moh267Row>();
  rows.forEach((row) => latest.set(row.patient_id ?? row, row)); // rows come oldest first
  return Array.from(latest.values());
};

/** One age-by-sex table: the count for a population, age band and sex */
export type AgeSexCounts = (population: Population | 'TOTAL', bandIndex: number, sex: Sex) => number;

const ageSexCounts =
  (rows: Moh267Row[]): AgeSexCounts =>
  (population, bandIndex, sex) =>
    rows.filter(
      (row) =>
        (population === 'TOTAL' || row.population_type === population) &&
        row.sex === sex &&
        inBand(row, AGE_BANDS[bandIndex]),
    ).length;

const isCurrent = (row: Moh267Row) => ['New', 'Continuing', 'Restart'].includes(row.prep_status ?? '');

export function moh267Summary(rows: Moh267Row[], endDate: string) {
  const latest = latestPerClient(rows);
  const newVisits = rows.filter((row) => Number(row.is_new) === 1);
  const threeMonthsBefore = dayjs(endDate).subtract(3, 'month');

  /* clients on each method, for the method table: by their latest visit */
  const byMethod = (clients: Moh267Row[]) => (method: (typeof METHODS)[number] | 'Total') =>
    clients.filter((row) => method === 'Total' || row.prep_method === method).length;

  return {
    initiated: ageSexCounts(newVisits),
    current: ageSexCounts(latest.filter(isCurrent)),
    sti: ageSexCounts(rows.filter((row) => row.sti_diagnosed === 'Yes')),
    methods: [
      { label: 'Number initiated (New) on PrEP', count: byMethod(newVisits) },
      {
        label: 'Number continuing / currently on (Refills) PrEP',
        count: byMethod(latest.filter((row) => row.prep_status === 'Continuing')),
      },
      { label: 'Number Restarting PrEP', count: byMethod(latest.filter((row) => row.prep_status === 'Restart')) },
      {
        label: 'Number on PrEP for at-least 3 months',
        count: byMethod(
          latest.filter(
            (row) =>
              isCurrent(row) && row.prep_start_date && !dayjs(row.prep_start_date).isAfter(threeMonthsBefore, 'day'),
          ),
        ),
      },
    ],
    seroconverted: rows.filter((row) => Number(row.is_seroconverted) === 1).length,
  };
}

export type Moh267Summary = ReturnType<typeof moh267Summary>;
