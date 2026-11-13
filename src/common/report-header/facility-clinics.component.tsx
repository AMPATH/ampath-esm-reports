import React from 'react';
import { Toggletip, ToggletipButton, ToggletipContent } from '@carbon/react';

import styles from './facility-clinics.scss';

interface FacilityClinicsProps {
  /** e.g. `MTRH` */
  name: string;
  /** The clinics the figures include (useFacility); nothing is shown beside the name without them */
  clinics: string[];
}

/**
 * A facility's name with an "18 clinics" button beside it, which lists every
 * clinic a report's figures include -- for reports the ETL widens to the whole
 * facility.
 */
const FacilityClinics: React.FC<FacilityClinicsProps> = ({ name, clinics }) => (
  <>
    {name}
    {clinics.length > 0 && (
      /* on screen only: a PDF names just the facility */
      <span data-pdf-hidden>
        <Toggletip align="bottom-left" autoAlign className={styles.clinics}>
          <ToggletipButton label={`Clinics in ${name}`} className={styles.clinicsButton}>
            {clinics.length === 1 ? '1 clinic' : `${clinics.length} clinics`}
          </ToggletipButton>
          <ToggletipContent>
            <p className={styles.clinicsTitle}>Includes every clinic in {name}</p>
            <ul className={styles.clinicsList}>
              {clinics.map((clinic) => (
                <li key={clinic}>{clinic}</li>
              ))}
            </ul>
          </ToggletipContent>
        </Toggletip>
      </span>
    )}
  </>
);

export default FacilityClinics;
