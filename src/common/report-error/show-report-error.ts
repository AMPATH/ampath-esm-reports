import { showSnackbar } from '@openmrs/esm-framework';

/**
 * The single way a report reports a failure.
 *
 * Reports previously each rendered their own error markup driven by local
 * state, which is easy to get wrong and easy to leave out. A snackbar keeps the
 * report body showing whatever was last generated instead of replacing it, and
 * behaves the same whether the failure came from the fetch, the ETL
 * configuration or a malformed response.
 */
export function showReportError(reportName: string, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);

  // still worth a console entry: the snackbar is transient and truncates
  console.error(`Failed to generate ${reportName}`, error);

  showSnackbar({
    kind: 'error',
    title: `Could not generate ${reportName}`,
    subtitle: message,
    isLowContrast: false,
    autoClose: false,
  });
}
