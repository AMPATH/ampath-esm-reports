import { useEffect, useState } from 'react';
import { openmrsFetch, useSession } from '@openmrs/esm-framework';

export interface LocationDetails {
  county?: string;
  subCounty?: string;
  /** The location attribute carrying the Kenya Master Health Facility List code */
  kmhflCode?: string;
}

/**
 * The extra masthead facts the MOH forms print but the session object does
 * not carry: County / Sub-County map to the location's address fields, and
 * the KMHFL code is whichever location attribute's type names the master
 * facility list (its exact type name varies by server, so the type is
 * matched by name). Values stay blank until the location answers.
 */
export function useLocationDetails(): LocationDetails {
  const session = useSession();
  const locationUuid = session?.sessionLocation?.uuid;
  const [details, setDetails] = useState<LocationDetails>({});

  useEffect(() => {
    if (!locationUuid) {
      return;
    }

    const abortController = new AbortController();

    openmrsFetch(
      `/ws/rest/v1/location/${locationUuid}?v=custom:(display,stateProvince,countyDistrict,attributes:(display,attributeType:(display)))`,
      { signal: abortController.signal },
    )
      .then(async (response) => {
        if (!response.ok) {
          return;
        }

        const location = await response.json();
        const kmhfl = (location?.attributes ?? []).find((attribute: any) =>
          /kmhfl|mfl|master health facility/i.test(attribute?.attributeType?.display ?? ''),
        );

        setDetails({
          county: location?.stateProvince || undefined,
          subCounty: location?.countyDistrict || undefined,
          kmhflCode: kmhfl?.display || undefined,
        });
      })
      .catch(() => {
        /* the header simply keeps its blanks when the lookup fails */
      });

    return () => abortController.abort();
  }, [locationUuid]);

  return details;
}
