/** One exported column: the heading it carries on the register, and its value */
export interface RegisterColumn {
  header: string;
  value: (row: Record<string, any>, index: number) => unknown;
}

/** The age bands the registers tabulate against, in the order they appear */
export const AGE_BANDS = [
  { label: '< 1 yrs', min: 0, max: 0 },
  { label: '1-4 yrs', min: 1, max: 4 },
  { label: '5-9 yrs', min: 5, max: 9 },
  { label: '10-14 yrs', min: 10, max: 14 },
  { label: '15-19 yrs', min: 15, max: 19 },
  { label: '20-24 yrs', min: 20, max: 24 },
  { label: '25+ yrs', min: 25, max: Number.POSITIVE_INFINITY },
] as const;

/**
 * Expands one indicator into the fourteen age-band by gender columns the
 * register prints for it.
 *
 * The registers spell these out as fourteen near-identical cells; describing
 * the rule once keeps the export in step with the table without restating it
 * fourteen times per block.
 */
export function ageBandColumns(heading: string, value: (row: Record<string, any>) => unknown): RegisterColumn[] {
  return AGE_BANDS.flatMap((band) =>
    (['M', 'F'] as const).map((gender) => ({
      header: `${heading} ${band.label} (${gender})`,
      value: (row: Record<string, any>) =>
        row.age >= band.min && row.age <= band.max && row.gender === gender ? value(row) : '',
    })),
  );
}
