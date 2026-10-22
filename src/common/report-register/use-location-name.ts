import { useEffect, useState } from 'react';
import { openmrsFetch, useSession } from '@openmrs/esm-framework';

/**
 * The display name of the location(s) a register was generated for.
 *
 * Read from the link's `locationUuids` rather than the session: the user may
 * have switched location since generating the report, and the register must
 * name the location its rows came from. The session location answers without
 * a request when it is the one asked for; any other is looked up. Several
 * uuids (comma-separated) are named in order.
 */
export function useLocationName(locationUuids: string | null | undefined): string {
  const session = useSession();
  const uuids = (locationUuids ?? '')
    .split(',')
    .map((uuid) => uuid.trim())
    .filter(Boolean);
  const key = uuids.join(',');
  const sessionUuid = session?.sessionLocation?.uuid;
  const sessionName = session?.sessionLocation?.display;

  const [names, setNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const missing = uuids.filter((uuid) => uuid !== sessionUuid);
    if (missing.length === 0) {
      return;
    }

    const abortController = new AbortController();

    Promise.all(
      missing.map((uuid) =>
        openmrsFetch(`/ws/rest/v1/location/${uuid}?v=custom:(display)`, { signal: abortController.signal })
          .then((response) => response.json())
          .then((location) => [uuid, location?.display ?? ''] as const)
          .catch(() => [uuid, ''] as const),
      ),
    ).then((found) => {
      if (!abortController.signal.aborted) {
        setNames(Object.fromEntries(found.filter(([, name]) => name)));
      }
    });

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, sessionUuid]);

  return uuids
    .map((uuid) => (uuid === sessionUuid ? sessionName : names[uuid]))
    .filter(Boolean)
    .join(', ');
}
