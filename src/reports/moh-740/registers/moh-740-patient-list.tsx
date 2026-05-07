import React, { useEffect, useState } from 'react';
import { type Moh222Patient, type Moh270Patient } from '../types';
import { fetchMoh740Register } from '../moh-740.resource';
import Moh270DailyRegister from './moh-270-permanent-register/moh-270-permanent-register';
import { InlineLoading } from '@carbon/react';
import { Moh740Rgisters } from '../shared/utils/indicator-register-map';
import Moh222DailyRegister from './moh-222-daily-register/moh-222-daily-register';
interface Moh740PatientListProps {
  locationUuid: string;
  reportingMonth: string;
  indicators: string;
  register: string;
}
const Moh740PatientList: React.FC<Moh740PatientListProps> = ({ locationUuid, reportingMonth, indicators, register }) => {
  const [moh270patientList, setMoh270PatientList] = useState<Moh270Patient[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [moh222PatientList, setMoh222PatientList] = useState<Moh222Patient[]>([]);

  useEffect(() => {
    if (locationUuid && reportingMonth && indicators) {
      fethPatientList();
    }
  }, [locationUuid, reportingMonth, indicators,register]);
  async function fethPatientList() {
    setIsLoading(true);
    const resp = await fetchMoh740Register({
      locationUuid: locationUuid,
      endDate: reportingMonth,
      indicators: indicators,
    });

    setIsLoading(false);

    if (resp) {
      if (register === Moh740Rgisters.DailyRegister) {
        setMoh222PatientList(resp as any);
        setMoh270PatientList([]);
      }
      if (register === Moh740Rgisters.PermanentRegister) {
        setMoh270PatientList(resp);
        setMoh222PatientList([]);
      }

    }
  }
  if (!locationUuid || !reportingMonth || !indicators) {
    return <></>;
  }
  if (loading) {
    return <InlineLoading description="Fetching patient list..." />;
  }
  return <>

    {
      moh270patientList && register === Moh740Rgisters.PermanentRegister && <Moh270DailyRegister indicator={indicators} moh270PatientList={moh270patientList} />
    }
    {
      moh222PatientList && register === Moh740Rgisters.DailyRegister && <Moh222DailyRegister
        moh222PatientList={moh222PatientList}
        indicator={indicators}
      />
    }
  </>;
};

export default Moh740PatientList;
