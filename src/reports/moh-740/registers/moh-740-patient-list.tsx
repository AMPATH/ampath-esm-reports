import React, { useEffect, useState } from 'react';
import { type Moh222Patient, type Moh270Patient } from '../types';
import { fetchMoh740Register } from '../moh-740.resource';
import Moh270DailyRegister from './moh-270-permanent-register/moh-270-permanent-register';
import { Moh740Rgisters } from '../shared/utils/indicator-register-map';
import Moh222DailyRegister from './moh-222-daily-register/moh-222-daily-register';
import { MOH_222_COLUMNS, MOH_270_COLUMNS } from './moh-740.columns';
import { RegisterLayout } from '../../../common/report-register';
import { showReportError } from '../../../common/report-error';

interface Moh740PatientListProps {
  locationUuid: string;
  reportingMonth: string;
  indicators: string;
  register: string;
  /** Puts the report back; these registers are a view on its own route */
  onBack: () => void;
}

const Moh740PatientList: React.FC<Moh740PatientListProps> = ({
  locationUuid,
  reportingMonth,
  indicators,
  register,
  onBack,
}) => {
  const [moh270patientList, setMoh270PatientList] = useState<Moh270Patient[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [moh222PatientList, setMoh222PatientList] = useState<Moh222Patient[]>([]);

  const isDaily = register === Moh740Rgisters.DailyRegister;

  useEffect(() => {
    if (locationUuid && reportingMonth && indicators) {
      fethPatientList();
    }
  }, [locationUuid, reportingMonth, indicators, register]);

  async function fethPatientList() {
    setIsLoading(true);

    try {
      const resp = await fetchMoh740Register({
        locationUuid: locationUuid,
        endDate: reportingMonth,
        indicators: indicators,
      });

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
    } catch (error) {
      /* Without this a failed fetch left an empty list, which reads on screen
         as "no clients matched" rather than as a request that did not land. */
      setMoh222PatientList([]);
      setMoh270PatientList([]);
      showReportError('the register', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!locationUuid || !reportingMonth || !indicators) {
    return <></>;
  }

  const rows: Array<Record<string, any>> = isDaily ? moh222PatientList : moh270patientList;

  return (
    <RegisterLayout
      parentLabel="MOH-740 Report"
      onBack={onBack}
      title={isDaily ? 'Daily Activity Register - MOH 222' : 'Permanent Register - MOH 270'}
      isLoading={loading}
      isEmpty={rows.length === 0}
      columns={isDaily ? MOH_222_COLUMNS : MOH_270_COLUMNS}
      fetchAll={async () => rows}
    >
      {isDaily ? (
        <Moh222DailyRegister moh222PatientList={moh222PatientList} />
      ) : (
        <Moh270DailyRegister moh270PatientList={moh270patientList} />
      )}
    </RegisterLayout>
  );
};

export default Moh740PatientList;
