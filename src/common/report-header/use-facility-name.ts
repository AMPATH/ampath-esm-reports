import { useEffect, useState } from 'react';
import { openmrsFetch } from '@openmrs/esm-framework';

/* AMPATH's parent locations mostly carry a code for a name (MTRHPL, BDHPL)
   and the facility's own name in their description, e.g. "Busia District
   Hospital Parent Location" or "Railways Parent Location (Uasin Gishu)" (spelt
   variously: "Parent location", "Parent Locaion") */
const PARENT_PHRASE = /\s*parent\s+loca\w*/i;
const PARENT_CODE = /^[a-z]+PL$/i;

interface LocationRecord {
  name?: string;
  description?: string;
  retired?: boolean;
  childLocations?: LocationRecord[];
  parentLocation?: LocationRecord;
}

/**
 * A location's facility name: from its parent's description without "Parent
 * Location"; else the parent's name, unless that is only a code (TWPL, with no
 * description), when the location's own name stands for it.
 */
const facilityNameOf = (location: LocationRecord) => {
  const parent = location.parentLocation;
  if (!parent) {
    return location.name ?? '';
  }
  if (parent.description && PARENT_PHRASE.test(parent.description)) {
    return parent.description.replace(PARENT_PHRASE, '').replace(/\s+/g, ' ').trim();
  }
  return parent.name && !PARENT_CODE.test(parent.name) ? parent.name : (location.name ?? '');
};

/**
 * The clinics a location's facility takes in, as the ETL widens it: the active
 * locations under its parent, or under itself (and itself) when it has none.
 * A parent that is only a grouping code (MTRHPL) is not listed as a clinic.
 */
const facilityClinicsOf = (location: LocationRecord) => {
  const root = location.parentLocation ?? location;
  const children = (root.childLocations ?? []).filter((child) => !child.retired).map((child) => child.name ?? '');
  const self = location.parentLocation ? [] : [location.name ?? ''];
  return [...self, ...children].filter(Boolean);
};

export interface Facility {
  /** e.g. `MTRH`; the fallback until the locations answer */
  name: string;
  /** Every clinic the figures include, A–Z; empty until the locations answer */
  clinics: string[];
}

/**
 * The facility a report covers, for reports the ETL widens to the whole
 * facility (widenToFacility): a location stands for its parent location and
 * every location under it, or for itself when it has no parent. So MTRH
 * Module 1 is named by its parent (MTRHPL, "MTRH Parent Location") as MTRH,
 * with the MTRH clinics the figures include. Several uuids (comma-separated)
 * are named in order, each facility once.
 *
 * Until the locations answer (or if the lookup fails) the name is `fallback`,
 * e.g. the session location's own name.
 */
export function useFacility(locationUuids: string | null | undefined, fallback = ''): Facility {
  const uuids = (locationUuids ?? '')
    .split(',')
    .map((uuid) => uuid.trim())
    .filter(Boolean);
  const key = uuids.join(',');

  const [found, setFound] = useState<Record<string, { name: string; clinics: string[] }>>({});

  useEffect(() => {
    if (uuids.length === 0) {
      return;
    }

    const abortController = new AbortController();
    const fields = 'name,description,retired,childLocations:(name,retired)';

    Promise.all(
      uuids.map((uuid) =>
        openmrsFetch(`/ws/rest/v1/location/${uuid}?v=custom:(${fields},parentLocation:(${fields}))`, {
          signal: abortController.signal,
        })
          .then((response) => response.json())
          .then(
            (location: LocationRecord) =>
              [uuid, { name: facilityNameOf(location), clinics: facilityClinicsOf(location) }] as const,
          )
          .catch(() => [uuid, { name: '', clinics: [] }] as const),
      ),
    ).then((results) => {
      if (!abortController.signal.aborted) {
        setFound(Object.fromEntries(results.filter(([, facility]) => facility.name)));
      }
    });

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const answered = uuids.length > 0 && uuids.every((uuid) => found[uuid]);
  if (!answered) {
    return { name: fallback, clinics: [] };
  }
  return {
    name: [...new Set(uuids.map((uuid) => found[uuid].name))].join(', '),
    clinics: [...new Set(uuids.flatMap((uuid) => found[uuid].clinics))].sort((a, b) => a.localeCompare(b)),
  };
}

/** Just the facility's name; see `useFacility` */
export function useFacilityName(locationUuids: string | null | undefined, fallback = ''): string {
  return useFacility(locationUuids, fallback).name;
}
