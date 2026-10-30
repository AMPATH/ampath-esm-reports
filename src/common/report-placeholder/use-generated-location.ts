import { useCallback, useState } from 'react';
import { useSession } from '@openmrs/esm-framework';

function readLocation(storageKey?: string): string {
  if (!storageKey) {
    return '';
  }
  try {
    return sessionStorage.getItem(storageKey) ?? '';
  } catch {
    return '';
  }
}

function writeLocation(storageKey: string | undefined, locationUuid: string) {
  if (!storageKey) {
    return;
  }
  try {
    sessionStorage.setItem(storageKey, locationUuid);
  } catch {
    /* storage unavailable: the report just won't survive a reload */
  }
}

/**
 * Which location the report on screen was generated for, compared with the
 * one the user is at now.
 *
 * A report's figures belong to the location they were fetched for, but its
 * masthead names the session location. After switching location, the old
 * figures would be shown -- and labelled -- as the new location's. So a report
 * only counts as generated while it is for the current location; otherwise the
 * page falls back to the placeholder and asks for it to be generated again.
 *
 * Reports that keep their figures in session storage pass `storageKey`, so the
 * location is restored alongside them. Figures restored without a location
 * (saved before this was recorded) are treated as not generated, rather than
 * assumed to be for wherever the user happens to be.
 */
export function useGeneratedLocation(storageKey?: string) {
  const session = useSession();
  const currentLocation = session?.sessionLocation?.uuid ?? '';
  const [generatedLocation, setGeneratedLocation] = useState(() => readLocation(storageKey));

  /** Call once a report has been fetched, with the location it was fetched for */
  const markGenerated = useCallback(
    (locationUuid: string) => {
      setGeneratedLocation(locationUuid);
      writeLocation(storageKey, locationUuid);
    },
    [storageKey],
  );

  return {
    /** The report held is for the location the user is at now */
    isForCurrentLocation: Boolean(generatedLocation) && generatedLocation === currentLocation,
    /** A report is held, but for a different location than the current one */
    hasLocationChanged: Boolean(generatedLocation) && generatedLocation !== currentLocation,
    markGenerated,
  };
}
