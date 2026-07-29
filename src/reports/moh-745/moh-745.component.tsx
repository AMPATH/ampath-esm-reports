import React, { useState } from 'react';
import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { hasReportData, ReportPlaceholder } from '../../common/report-placeholder';

import styles from './moh-745.scss';
import classNames from 'classnames';
import { formatDate, useSession } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { getMoh745 } from '../../resources/moh-745.resource';
import { useNavigate } from 'react-router-dom';
import { ReportSkeleton } from '../../common/report-skeleton';
import { ReportPage } from '../../common/report-page';

const Moh745Component: React.FC = () => {
  const [moh745Data, setMoh745Data] = useState<any>([]);
  const isReportGenerated = hasReportData(moh745Data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;

  /* Masthead and sign-off fill themselves in, as on the other reports: the
     location generated from, the period generated for, and who ran it. */
  const facility = session?.sessionLocation?.display ?? '';
  const reportMonth = startDate ? dayjs(startDate).format('MMMM') : '';
  const reportYear = startDate ? dayjs(startDate).format('YYYY') : '';
  const compiledBy = session?.user?.person?.display ?? session?.user?.display ?? '';
  const compiledOn = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });

  const navigate = useNavigate();

  const fetchMoh745ReportData = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setStartDate(startDate);
    setEndDate(endDate);

    const params = {
      locationUuids: locationUuids || '',
      startDate,
      endDate,
    };
    try {
      const data = await getMoh745(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh745Data(flatData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showReportError('the MOH-745 report', error);
    }
  };

  /* A register's breadcrumb links back here with the period it was opened
     for, so the report comes back showing the figures rather than the
     placeholder. */
  useRestorePeriod(fetchMoh745ReportData);

  const navigateToRegister = (indicator?: string) => {
    navigate(
      `/moh-412-register?startDate=${startDate}&endDate=${endDate}&locationUuids=${locationUuids}&indicator=${indicator}&from=moh-745`,
    );
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-745 Report"
        mode="both"
        onGenerate={fetchMoh745ReportData}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={{ startDate, endDate }}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && <ReportPlaceholder reportName="MOH-745" />}
      {!isLoading && isReportGenerated && (
        <ReportPage>
          <h3 className={styles.reportTitle}>CANCER SCREENING MONTHLY SUMMARY FORM</h3>
          <div className={styles.location}>
            <span>
              Facility Name: <span className={styles.line}>{facility}</span>
            </span>
            <span>
              Facility Code: <span className={styles.line}></span>
            </span>
            <span>
              County: <span className={styles.shortLine}></span>
            </span>
            <span>
              Sub-County: <span className={styles.shortLine}></span>
            </span>
            <span>
              Month: <span className={styles.shortLine}>{reportMonth}</span>
            </span>
            <span>
              Year: <span className={styles.shortLine}>{reportYear}</span>
            </span>
          </div>
          <div className={styles.tableContainer}>
            <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
              <thead>
                <tr>
                  <th colSpan={14}>CERVICAL CANCER SCREENING SUMMARY</th>
                </tr>
                <tr>
                  <th rowSpan={2}>
                    INDICATORS
                    <br />
                    <span>
                      (Use the page Tally/Summary from the Cancer Screening Register
                      <br /> to complete the report)
                    </span>
                  </th>
                  <th colSpan={4}>1) Initial Screening</th>
                  <th colSpan={4}>2) Routine Screening</th>
                  <th colSpan={4}>3) Post-treatment Screening</th>
                  <th rowSpan={2} className={styles.rotateUp}>
                    Total no. of Clients <br />
                    <span>
                      (Initial + Routine <br />+<br /> Post Treatment)
                    </span>
                  </th>
                </tr>
                <tr>
                  <td className={styles.rotateUp}>&lt;25 years</td>
                  <td className={styles.rotateUp}>25 - 49 years</td>
                  <td className={styles.rotateUp}>
                    50 years and <br />
                    above
                  </td>
                  <td className={styles.rotateUp}>
                    Total (Initial <br /> screening)
                  </td>
                  <td className={styles.rotateUp}>&lt;25 years</td>
                  <td className={styles.rotateUp}>25 - 49 years</td>
                  <td className={styles.rotateUp}>
                    50 years and <br />
                    above
                  </td>
                  <td className={styles.rotateUp}>
                    Total (Routine <br /> screening)
                  </td>
                  <td className={styles.rotateUp}>&lt;25 years</td>
                  <td className={styles.rotateUp}>25 - 49 years</td>
                  <td className={styles.rotateUp}>
                    50 years and <br />
                    above
                  </td>
                  <td className={styles.rotateUp}>
                    Total (Post- <br />
                    treatment <br /> screening)
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 a) Number of clients who received VIA or VIA/VILLI Screening</td>
                  <td onClick={() => navigateToRegister('via_villi_less_25_initial_screening')}>
                    {moh745Data.via_villi_less_25_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('via_villi_25_49_initial_screening')}>
                    {moh745Data.via_villi_25_49_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('via_villi_50_above_initial_screening')}>
                    {moh745Data.via_villi_50_above_initial_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('via_villi_less_25_routine_screening')}>
                    {moh745Data.via_villi_less_25_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('via_villi_25_49_routine_screening')}>
                    {moh745Data.via_villi_25_49_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('via_villi_50_above_routine_screening')}>
                    {moh745Data.via_villi_50_above_routine_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('via_villi_less_25_post_treatment_screening')}>
                    {moh745Data.via_villi_less_25_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('via_villi_25_49_post_treatment_screening')}>
                    {moh745Data.via_villi_25_49_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('via_villi_50_above_post_treatment_screening')}>
                    {moh745Data.via_villi_50_above_post_treatment_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('via_villi_total')}>{moh745Data.via_villi_total}</td>
                </tr>
                <tr>
                  <td> b) Number of clients who received Pap smear</td>
                  <td onClick={() => navigateToRegister('pap_smear_less_25_initial_screening')}>
                    {moh745Data.pap_smear_less_25_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('pap_smear_25_49_initial_screening')}>
                    {moh745Data.pap_smear_25_49_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('pap_smear_50_above_initial_screening')}>
                    {moh745Data.pap_smear_50_above_initial_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('pap_smear_less_25_routine_screening')}>
                    {moh745Data.pap_smear_less_25_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('pap_smear_25_49_routine_screening')}>
                    {moh745Data.pap_smear_25_49_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('pap_smear_50_above_routine_screening')}>
                    {moh745Data.pap_smear_50_above_routine_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('pap_smear_less_25_post_treatment_screening')}>
                    {moh745Data.pap_smear_less_25_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('pap_smear_25_49_post_treatment_screening')}>
                    {moh745Data.pap_smear_25_49_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('pap_smear_50_above_post_treatment_screening')}>
                    {moh745Data.pap_smear_50_above_post_treatment_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('pap_smear_total')}>{moh745Data.pap_smear_total}</td>
                </tr>
                <tr>
                  <td> c) Number of clients who received HPV Test</td>
                  <td onClick={() => navigateToRegister('hpv_test_less_25_initial_screening')}>
                    {moh745Data.hpv_test_less_25_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('hpv_test_25_49_initial_screening')}>
                    {moh745Data.hpv_test_25_49_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('hpv_test_50_above_initial_screening')}>
                    {moh745Data.hpv_test_50_above_initial_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('hpv_test_less_25_routine_screening')}>
                    {moh745Data.hpv_test_less_25_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('hpv_test_25_49_routine_screening')}>
                    {moh745Data.hpv_test_25_49_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('hpv_test_50_above_routine_screening')}>
                    {moh745Data.hpv_test_50_above_routine_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('hpv_test_less_25_post_treatment_screening')}>
                    {moh745Data.hpv_test_less_25_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('hpv_test_25_49_post_treatment_screening')}>
                    {moh745Data.hpv_test_25_49_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('hpv_test_50_above_post_treatment_screening')}>
                    {moh745Data.hpv_test_50_above_post_treatment_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('hpv_test_total')}>{moh745Data.hpv_test_total}</td>
                </tr>
                <tr>
                  <td>Total Clients Screened (1 a, b &c Above)</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
                <tr>
                  <td>2 a) Number of clients with Positive VIA or VIA/VILLI result</td>
                  <td onClick={() => navigateToRegister('positive_via_villi_less_25_initial_screening')}>
                    {moh745Data.positive_via_villi_less_25_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_via_villi_25_49_initial_screening')}>
                    {moh745Data.positive_via_villi_25_49_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_via_villi_50_above_initial_screening')}>
                    {moh745Data.positive_via_villi_50_above_initial_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('positive_via_villi_less_25_routine_screening')}>
                    {moh745Data.positive_via_villi_less_25_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_via_villi_25_49_routine_screening')}>
                    {moh745Data.positive_via_villi_25_49_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_via_villi_50_above_routine_screening')}>
                    {moh745Data.positive_via_villi_50_above_routine_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('positive_via_villi_less_25_post_treatment_screening')}>
                    {moh745Data.positive_via_villi_less_25_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_via_villi_25_49_post_treatment_screening')}>
                    {moh745Data.positive_via_villi_25_49_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_via_villi_50_above_post_treatment_screening')}>
                    {moh745Data.positive_via_villi_50_above_post_treatment_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('positive_via_villi_total')}>
                    {moh745Data.positive_via_villi_total}
                  </td>
                </tr>
                <tr>
                  <td> b) Number of clients with Positive Cytology result</td>
                  <td onClick={() => navigateToRegister('positive_cytology_less_25_initial_screening')}>
                    {moh745Data.positive_cytology_less_25_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_cytology_25_49_initial_screening')}>
                    {moh745Data.positive_cytology_25_49_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_cytology_50_above_initial_screening')}>
                    {moh745Data.positive_cytology_50_above_initial_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('positive_cytology_less_25_routine_screening')}>
                    {moh745Data.positive_cytology_less_25_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_cytology_25_49_routine_screening')}>
                    {moh745Data.positive_cytology_25_49_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_cytology_50_above_routine_screening')}>
                    {moh745Data.positive_cytology_50_above_routine_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('positive_cytology_less_25_post_treatment_screening')}>
                    {moh745Data.positive_cytology_less_25_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_cytology_25_49_post_treatment_screening')}>
                    {moh745Data.positive_cytology_25_49_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_cytology_50_above_post_treatment_screening')}>
                    {moh745Data.positive_cytology_50_above_post_treatment_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('positive_cytology_total')}>
                    {moh745Data.positive_cytology_total}
                  </td>
                </tr>
                <tr>
                  <td> c) Number of clients with Positive HPV result</td>
                  <td onClick={() => navigateToRegister('positive_hpv_less_25_initial_screening')}>
                    {moh745Data.positive_hpv_less_25_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_hpv_25_49_initial_screening')}>
                    {moh745Data.positive_hpv_25_49_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_hpv_50_above_initial_screening')}>
                    {moh745Data.positive_hpv_50_above_initial_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('positive_hpv_less_25_routine_screening')}>
                    {moh745Data.positive_hpv_less_25_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_hpv_25_49_routine_screening')}>
                    {moh745Data.positive_hpv_25_49_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_hpv_50_above_routine_screening')}>
                    {moh745Data.positive_hpv_50_above_routine_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('positive_hpv_less_25_post_treatment_screening')}>
                    {moh745Data.positive_hpv_less_25_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_hpv_25_49_post_treatment_screening')}>
                    {moh745Data.positive_hpv_25_49_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('positive_hpv_50_above_post_treatment_screening')}>
                    {moh745Data.positive_hpv_50_above_post_treatment_screening}
                  </td>
                  <td></td>
                  <td onClick={() => navigateToRegister('positive_hpv_total')}>{moh745Data.positive_hpv_total}</td>
                </tr>
                <tr>
                  <td>Total Clients Screened positive (2 a, b &c Above)</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
                <tr>
                  <td>3) Number of clients with suspicios cancer lessions </td>
                  <td onClick={() => navigateToRegister('suspicious_cancer_lessions_less_25_initial_screening')}>
                    {moh745Data.suspicious_cancer_lessions_less_25_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('suspicious_cancer_lessions_25_49_initial_screening')}>
                    {moh745Data.suspicious_cancer_lessions_25_49_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('suspicious_cancer_lessions_50_above_initial_screening')}>
                    {moh745Data.suspicious_cancer_lessions_50_above_initial_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('suspicious_cancer_lessions_less_25_routine_screening')}>
                    {moh745Data.suspicious_cancer_lessions_less_25_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('suspicious_cancer_lessions_25_49_routine_screening')}>
                    {moh745Data.suspicious_cancer_lessions_25_49_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('suspicious_cancer_lessions_50_above_routine_screening')}>
                    {moh745Data.suspicious_cancer_lessions_50_above_routine_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('suspicious_cancer_lessions_less_25_post_treatment_screening')}>
                    {moh745Data.suspicious_cancer_lessions_less_25_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('suspicious_cancer_lessions_25_49_post_treatment_screening')}>
                    {moh745Data.suspicious_cancer_lessions_25_49_post_treatment_screening}
                  </td>
                  <td
                    onClick={() => navigateToRegister('suspicious_cancer_lessions_50_above_post_treatment_screening')}
                  >
                    {moh745Data.suspicious_cancer_lessions_50_above_post_treatment_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('suspicious_cancer_lessions_total')}>
                    {moh745Data.suspicious_cancer_lessions_total}
                  </td>
                </tr>
                <tr>
                  <td>4) Number of clients treated using Cryotherapy</td>
                  <td onClick={() => navigateToRegister('cryotherapy_treatment_less_25_initial_screening')}>
                    {moh745Data.cryotherapy_treatment_less_25_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('cryotherapy_treatment_25_49_initial_screening')}>
                    {moh745Data.cryotherapy_treatment_25_49_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('cryotherapy_treatment_50_above_initial_screening')}>
                    {moh745Data.cryotherapy_treatment_50_above_initial_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('cryotherapy_treatment_less_25_routine_screening')}>
                    {moh745Data.cryotherapy_treatment_less_25_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('cryotherapy_treatment_25_49_routine_screening')}>
                    {moh745Data.cryotherapy_treatment_25_49_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('cryotherapy_treatment_50_above_routine_screening')}>
                    {moh745Data.cryotherapy_treatment_50_above_routine_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('cryotherapy_treatment_less_25_post_treatment_screening')}>
                    {moh745Data.cryotherapy_treatment_less_25_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('cryotherapy_treatment_25_49_post_treatment_screening')}>
                    {moh745Data.cryotherapy_treatment_25_49_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('cryotherapy_treatment_50_above_post_treatment_screening')}>
                    {moh745Data.cryotherapy_treatment_50_above_post_treatment_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('cryotherapy_treatment_total')}>
                    {moh745Data.cryotherapy_treatment_total}
                  </td>
                </tr>
                <tr>
                  <td>5) Number of clients treated using Thermocoagulation</td>
                  <td onClick={() => navigateToRegister('thermocoagulation_treatment_less_25_initial_screening')}>
                    {moh745Data.thermocoagulation_treatment_less_25_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('thermocoagulation_treatment_25_49_initial_screening')}>
                    {moh745Data.thermocoagulation_treatment_25_49_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('thermocoagulation_treatment_50_above_initial_screening')}>
                    {moh745Data.thermocoagulation_treatment_50_above_initial_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('thermocoagulation_treatment_less_25_routine_screening')}>
                    {moh745Data.thermocoagulation_treatment_less_25_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('thermocoagulation_treatment_25_49_routine_screening')}>
                    {moh745Data.thermocoagulation_treatment_25_49_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('thermocoagulation_treatment_50_above_routine_screening')}>
                    {moh745Data.thermocoagulation_treatment_50_above_routine_screening}
                  </td>
                  <td>{}</td>
                  <td
                    onClick={() => navigateToRegister('thermocoagulation_treatment_less_25_post_treatment_screening')}
                  >
                    {moh745Data.thermocoagulation_treatment_less_25_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('thermocoagulation_treatment_25_49_post_treatment_screening')}>
                    {moh745Data.thermocoagulation_treatment_25_49_post_treatment_screening}
                  </td>
                  <td
                    onClick={() => navigateToRegister('thermocoagulation_treatment_50_above_post_treatment_screening')}
                  >
                    {moh745Data.thermocoagulation_treatment_50_above_post_treatment_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('thermocoagulation_treatment_total')}>
                    {moh745Data.thermocoagulation_treatment_total}
                  </td>
                </tr>
                <tr>
                  <td>6) Number of clients treated using LEEP</td>
                  <td onClick={() => navigateToRegister('leep_treatment_less_25_initial_screening')}>
                    {moh745Data.leep_treatment_less_25_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('leep_treatment_25_49_initial_screening')}>
                    {moh745Data.leep_treatment_25_49_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('leep_treatment_50_above_initial_screening')}>
                    {moh745Data.leep_treatment_50_above_initial_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('leep_treatment_less_25_routine_screening')}>
                    {moh745Data.leep_treatment_less_25_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('leep_treatment_25_49_routine_screening')}>
                    {moh745Data.leep_treatment_25_49_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('leep_treatment_50_above_routine_screening')}>
                    {moh745Data.leep_treatment_50_above_routine_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('leep_treatment_less_25_post_treatment_screening')}>
                    {moh745Data.leep_treatment_less_25_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('leep_treatment_25_49_post_treatment_screening')}>
                    {moh745Data.leep_treatment_25_49_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('leep_treatment_50_above_post_treatment_screening')}>
                    {moh745Data.leep_treatment_50_above_post_treatment_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('leep_treatment_total')}>{moh745Data.leep_treatment_total}</td>
                </tr>
                <tr>
                  <td>7) Numeber of other treatment given (e.g Hysterectomy, cone)</td>
                  <td onClick={() => navigateToRegister('other_treatment_less_25_initial_screening')}>
                    {moh745Data.other_treatment_less_25_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('other_treatment_25_49_initial_screening')}>
                    {moh745Data.other_treatment_25_49_initial_screening}
                  </td>
                  <td onClick={() => navigateToRegister('other_treatment_50_above_initial_screening')}>
                    {moh745Data.other_treatment_50_above_initial_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('other_treatment_less_25_routine_screening')}>
                    {moh745Data.other_treatment_less_25_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('other_treatment_25_49_routine_screening')}>
                    {moh745Data.other_treatment_25_49_routine_screening}
                  </td>
                  <td onClick={() => navigateToRegister('other_treatment_50_above_routine_screening')}>
                    {moh745Data.other_treatment_50_above_routine_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('other_treatment_less_25_post_treatment_screening')}>
                    {moh745Data.other_treatment_less_25_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('other_treatment_25_49_post_treatment_screening')}>
                    {moh745Data.other_treatment_25_49_post_treatment_screening}
                  </td>
                  <td onClick={() => navigateToRegister('other_treatment_50_above_post_treatment_screening')}>
                    {moh745Data.other_treatment_50_above_post_treatment_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('other_treatment_total')}>
                    {moh745Data.other_treatment_total}
                  </td>
                </tr>
                <tr>
                  <td>8) Number of HIV positive clients screened</td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_screened_cervical_cancer_less_25_initial_screening')
                    }
                  >
                    {moh745Data.hiv_positive_screened_cervical_cancer_less_25_initial_screening}
                  </td>
                  <td
                    onClick={() => navigateToRegister('hiv_positive_screened_cervical_cancer_25_49_initial_screening')}
                  >
                    {moh745Data.hiv_positive_screened_cervical_cancer_25_49_initial_screening}
                  </td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_screened_cervical_cancer_50_above_initial_screening')
                    }
                  >
                    {moh745Data.hiv_positive_screened_cervical_cancer_50_above_initial_screening}
                  </td>
                  <td>{}</td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_screened_cervical_cancer_less_25_routine_screening')
                    }
                  >
                    {moh745Data.hiv_positive_screened_cervical_cancer_less_25_routine_screening}
                  </td>
                  <td
                    onClick={() => navigateToRegister('hiv_positive_screened_cervical_cancer_25_49_routine_screening')}
                  >
                    {moh745Data.hiv_positive_screened_cervical_cancer_25_49_routine_screening}
                  </td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_screened_cervical_cancer_50_above_routine_screening')
                    }
                  >
                    {moh745Data.hiv_positive_screened_cervical_cancer_50_above_routine_screening}
                  </td>
                  <td>{}</td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_screened_cervical_cancer_less_25_post_treatment_screening')
                    }
                  >
                    {moh745Data.hiv_positive_screened_cervical_cancer_less_25_post_treatment_screening}
                  </td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_screened_cervical_cancer_25_49_post_treatment_screening')
                    }
                  >
                    {moh745Data.hiv_positive_screened_cervical_cancer_25_49_post_treatment_screening}
                  </td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_screened_cervical_cancer_50_above_post_treatment_screening')
                    }
                  >
                    {moh745Data.hiv_positive_screened_cervical_cancer_50_above_post_treatment_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('hiv_positive_screened_cervical_cancer_total')}>
                    {moh745Data.hiv_positive_screened_cervical_cancer_total}
                  </td>
                </tr>
                <tr>
                  <td>9) Number of HIV positive with positive screening</td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_cervical_cancer_positive_less_25_initial_screening')
                    }
                  >
                    {moh745Data.hiv_positive_cervical_cancer_positive_less_25_initial_screening}
                  </td>
                  <td
                    onClick={() => navigateToRegister('hiv_positive_cervical_cancer_positive_25_49_initial_screening')}
                  >
                    {moh745Data.hiv_positive_cervical_cancer_positive_25_49_initial_screening}
                  </td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_cervical_cancer_positive_50_above_initial_screening')
                    }
                  >
                    {moh745Data.hiv_positive_cervical_cancer_positive_50_above_initial_screening}
                  </td>
                  <td>{}</td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_cervical_cancer_positive_less_25_routine_screening')
                    }
                  >
                    {moh745Data.hiv_positive_cervical_cancer_positive_less_25_routine_screening}
                  </td>
                  <td
                    onClick={() => navigateToRegister('hiv_positive_cervical_cancer_positive_25_49_routine_screening')}
                  >
                    {moh745Data.hiv_positive_cervical_cancer_positive_25_49_routine_screening}
                  </td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_cervical_cancer_positive_50_above_routine_screening')
                    }
                  >
                    {moh745Data.hiv_positive_cervical_cancer_positive_50_above_routine_screening}
                  </td>
                  <td>{}</td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_cervical_cancer_positive_less_25_post_treatment_screening')
                    }
                  >
                    {moh745Data.hiv_positive_cervical_cancer_positive_less_25_post_treatment_screening}
                  </td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_cervical_cancer_positive_25_49_post_treatment_screening')
                    }
                  >
                    {moh745Data.hiv_positive_cervical_cancer_positive_25_49_post_treatment_screening}
                  </td>
                  <td
                    onClick={() =>
                      navigateToRegister('hiv_positive_cervical_cancer_positive_50_above_post_treatment_screening')
                    }
                  >
                    {moh745Data.hiv_positive_cervical_cancer_positive_50_above_post_treatment_screening}
                  </td>
                  <td>{}</td>
                  <td onClick={() => navigateToRegister('hiv_positive_cervical_cancer_positive_total')}>
                    {moh745Data.hiv_positive_cervical_cancer_positive_total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.tableContainer}>
            <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
              <thead>
                <tr>
                  <th rowSpan={2}>BREAST CANCER SCREENING SUMMARY</th>
                  <th colSpan={13}>Screening Type and Results</th>
                  <th rowSpan={2} colSpan={2}>
                    FOLLOW UP AND REFERRAL
                  </th>
                </tr>
                <tr>
                  <th colSpan={3}>CBE</th>
                  <th colSpan={5}>Ultrasound - BIRADS</th>
                  <th colSpan={5}>Mammogram - BIRADS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Client Age</td>
                  <td>Normal</td>
                  <td>Abnormal</td>
                  <td>Total CBEs</td>
                  <td>0 to 3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>Total Ultrasounds Done</td>
                  <td>0 to 3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>Total Mammograms Done</td>
                  <td>No. Followed up</td>
                  <td>No. referred out</td>
                </tr>
                <tr>
                  <td>25-34 yrs</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
                <tr>
                  <td>35-39 yrs</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
                <tr>
                  <td>40-55 yrs</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
                <tr>
                  <td>56-74 yrs</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
                <tr>
                  <td>&gt; 75 yrs</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.tableContainer}>
            <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
              <thead>
                <tr>
                  <th rowSpan={2}>COLORECTAL CANCER SCREENING SUMMARY</th>
                  <th colSpan={8}>Screening Type and Results</th>
                </tr>
                <tr>
                  <th colSpan={3}>FORBT</th>
                  <th colSpan={5}>Colonoscopy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Client Age</td>
                  <td>Positive</td>
                  <td>Negative</td>
                  <td>Total FORBT Done</td>
                  <td>Total No abnormality</td>
                  <td>No. With Polyps</td>
                  <td>No. With Cancer</td>
                  <td>Total No. with other abnormalities</td>
                  <td>Total Colonoscopies Done</td>
                </tr>
                <tr>
                  <td>45-54 yrs</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
                <tr>
                  <td>55-64 yrs</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
                <tr>
                  <td>65-75 yrs</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.signOff}>
            <span>
              Compiled by: Name <span className={styles.line}>{compiledBy}</span>
            </span>
            <span>
              Signature <span className={styles.line}></span>
            </span>
            <span>
              Phone no <span className={styles.shortLine}></span>
            </span>
            <span>
              Date <span className={styles.shortLine}>{compiledOn}</span>
            </span>
          </div>
        </ReportPage>
      )}
    </>
  );
};

export default Moh745Component;
