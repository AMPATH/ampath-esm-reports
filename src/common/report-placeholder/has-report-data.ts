/**
 * Whether a report has been generated and came back with something to show.
 *
 * Reports flatten their response with `Object.assign({}, ...data.result)`, but
 * they initialise that state variously as `{}`, `[]` or a value restored from
 * sessionStorage, so "has it run yet" is really "does it have any keys". An
 * empty array has none, which is what makes this work across all of them.
 */
export function hasReportData(data: unknown): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return Object.keys(data).length > 0;
}
