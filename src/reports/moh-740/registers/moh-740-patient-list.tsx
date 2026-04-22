import React, { useEffect, useState } from 'react';
import { type Moh270Patient } from '../types';
import { fetchMoh740Register } from '../moh-740.resource';
import Moh270DailyRegister from './moh-270-permanent-register/moh-270-permanent-register';
import { InlineLoading } from '@carbon/react';
interface Moh740PatientListProps {
  locationUuid: string;
  reportingMonth: string;
  indicators: string;
}
const Moh740PatientList: React.FC<Moh740PatientListProps> = ({ locationUuid, reportingMonth, indicators }) => {
  const [patientList, setPatientList] = useState<Moh270Patient[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (locationUuid && reportingMonth && indicators) {
      fethPatientList();
    }
  }, [locationUuid, reportingMonth, indicators]);
  async function fethPatientList() {
    setIsLoading(true);
    const resp = await fetchMoh740Register({
      locationUuid: locationUuid,
      endDate: reportingMonth,
      indicators: indicators,
    });

    setIsLoading(false);

    if (resp) {
      setPatientList(resp);
    }
  }
  if (!locationUuid || !reportingMonth || !indicators) {
    return <></>;
  }
  if (loading) {
    return <InlineLoading description="Fetching patient list..." />;
  }
  return <>{patientList && <Moh270DailyRegister moh270PatientList={patientList} />}</>;
};

export default Moh740PatientList;
