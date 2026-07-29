import React, { useState } from 'react';
import styles from './moh-740.component.scss';
import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { ReportSkeleton } from '../../common/report-skeleton';
import { ReportPage } from '../../common/report-page';
import { ReportPlaceholder } from '../../common/report-placeholder';
import { showReportError } from '../../common/report-error';
import { type Moh740Data, type Moh740Dto } from './types';
import { formatDate, useSession } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { fetchMoh740Report } from './moh-740.resource';
import DataCell from './shared/data-cell/data-cell';
import Moh740PatientList from './registers/moh-740-patient-list';
import { getRegisterByIndicator, Moh740Rgisters } from './shared/utils/indicator-register-map';
import classNames from 'classnames';
interface Moh740ReportProps {}
const Moh740Report: React.FC<Moh740ReportProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moh740Data, setMoh740Data] = useState<Moh740Data | null>(null);
  /* Distinguishes "never generated" from "generated and came back empty";
     both leave `moh740Data` null but they are not the same thing to report. */
  const [hasGenerated, setHasGenerated] = useState(false);
  /* The period chosen in the filters, so the form is labelled with it as
     soon as it is selected rather than only after a fetch. */
  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod | null>(null);
  const [view, setView] = useState<string>('report');
  const [selectedIndicator, setSelectedIndicator] = useState<string>();
  const [reportingMonth, setReportingMonth] = useState<string>();
  const [registerType, setRegisterType] = useState<string>('');
  const session = useSession();
  const locationUuid = session.sessionLocation?.uuid;

  /* The masthead names the location the report was generated from, and the
     period it covers; the sign-off records who produced it and when. */
  const facility = session?.sessionLocation?.display ?? moh740Data?.facility ?? '';
  const monthYear = reportingMonth
    ? dayjs(reportingMonth).format('MMMM YYYY')
    : (selectedPeriod?.label ?? moh740Data?.reportingMonth ?? '');
  const compiledBy = session?.user?.person?.display ?? session?.user?.display ?? '';
  const compiledOn = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });
  const getMoh740ReportData = async ({ endDate }: ReportPeriod) => {
    setIsLoading(true);
    setReportingMonth(endDate);
    try {
      const reportFilters: Moh740Dto = { endDate, locationUuid: locationUuid ?? '' };
      const resp = await fetchMoh740Report(reportFilters);
      setMoh740Data(resp ?? null);
      setHasGenerated(true);
    } catch (error: any) {
      showReportError('the MOH-740 report', error);
    } finally {
      setIsLoading(false);
    }
  };

  /* A register's breadcrumb links back here with the period it was opened
     for, so the report comes back showing the figures rather than the
     placeholder. */
  useRestorePeriod(getMoh740ReportData);
  const handleIndicatorSelected = (selectedIndicator: string) => {
    setSelectedIndicator(selectedIndicator);
    const selectedRegister = getRegisterByIndicator(selectedIndicator as any);
    setRegisterType(selectedRegister);
    setView('register');
  };
  const handleBackToReport = () => {
    setView('report');
  };
  return (
    <>
      <div className={styles.reportLayout}>
        {view === 'report' ? (
          <>
            <div className={styles.reportHeader}>
              <div className={styles.reportFilters}>
                <ReportFiltersComponent
                  reportName="MOH-740 Report"
                  mode="both"
                  onGenerate={getMoh740ReportData}
                  isLoading={isLoading}
                  isReportGenerated={Boolean(moh740Data)}
                  onPeriodChange={setSelectedPeriod}
                />
              </div>
            </div>
            <div className={styles.reportContent}>
              {isLoading ? (
                <ReportSkeleton blocks={3} />
              ) : (
                <>
                  {moh740Data ? (
                    <ReportPage>
                      <div className={styles.headerContainer}>
                        <div className={styles.mainTitleBox}>
                          <h2 className={styles.mainTitle}>Ministry of Health</h2>
                          <h3 className={styles.subTitle}>
                            Diabetes and Hypertension Comprehensive Care: Monthly Summary Form
                          </h3>
                        </div>
                      </div>

                      <table className={styles.topMeta}>
                        <tbody>
                          <tr>
                            <td>
                              Name of the facility: <strong>{facility}</strong>
                            </td>
                            <td>
                              MFL code: <strong>{moh740Data?.mfl_code}</strong>
                            </td>
                            <td>
                              County: <strong>{moh740Data?.county}</strong>
                            </td>
                            <td>
                              Sub County: <strong>{moh740Data?.sub_county}</strong>
                            </td>
                            <td>
                              Month/Year: <strong>{monthYear}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table className={styles.dataTable}>
                        <thead>
                          <tr>
                            <th className={styles.dataElement}>Data Element</th>
                            <th className={styles.otherElement}>Male</th>
                            <th className={styles.otherElement}>Female</th>
                            <th className={styles.otherElement}>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className={styles.sectionHeader}>
                            <td className={styles.darkBorder} colSpan={4}>
                              DIABETES
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>Cumulative no. of diabetes patients in care</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__cumulative_diabetes_patients_in_care}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__cumulative_diabetes_patients_in_care"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__cumulative_diabetes_patients_in_care}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__cumulative_diabetes_patients_in_care"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.cumulative_diabetes_patients_in_care}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="cumulative_diabetes_patients_in_care"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of newly diagnosed diabetes cases</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__newly_diagnosed_diabetes}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__newly_diagnosed_diabetes"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__newly_diagnosed_diabetes}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__newly_diagnosed_diabetes"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.newly_diagnosed_diabetes}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="newly_diagnosed_diabetes"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>Revisit to clinic/Known DM</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__revisit_to_clinic_known_dm}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__revisit_to_clinic_known_dm"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__revisit_to_clinic_known_dm}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__revisit_to_clinic_known_dm"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.revisit_to_clinic_known_dm}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="revisit_to_clinic_known_dm"
                              />
                            </td>
                          </tr>

                          <tr className={styles.subHeader}>
                            <td className={styles.darkBorder} colSpan={4}>
                              Total No. with Type 1
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>0-5 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__0_to_5__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__0_to_5__type_1_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__0_to_5__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__0_to_5__type_1_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__0_to_5__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__0_to_5__type_1_diabetes_mellitus"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>6-9 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__6_to_9__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__6_to_9__type_1_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__6_to_9__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__6_to_9__type_1_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__6_to_9__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__6_to_9__type_1_diabetes_mellitus"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>10-19 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__10_to_19__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__10_to_19__type_1_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__10_to_19__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__10_to_19__type_1_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__10_to_19__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__10_to_19__type_1_diabetes_mellitus"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>20-35 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__20_to_35__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__20_to_35__type_1_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__20_to_35__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__20_to_35__type_1_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__20_to_35__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__20_to_35__type_1_diabetes_mellitus"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>{'>'} 35 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__36_and_above__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__36_and_above__type_1_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__36_and_above__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__36_and_above__type_1_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__36_and_above__type_1_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__36_and_above__type_1_diabetes_mellitus"
                              />
                            </td>
                          </tr>

                          <tr className={styles.subHeader}>
                            <td className={styles.darkBorder} colSpan={4}>
                              Total No. with Type 2
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>0-18 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__0_to_18__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__0_to_18__type_2_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__0_to_18__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__0_to_18__type_2_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__0_to_18__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__0_to_18__type_2_diabetes_mellitus"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>19-35 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__19_to_35__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__19_to_35__type_2_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__19_to_35__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__19_to_35__type_2_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__19_to_35__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__19_to_35__type_2_diabetes_mellitus"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>36-60 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__36_to_60__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__36_to_60__type_2_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__36_to_60__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__36_to_60__type_2_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__36_to_60__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__36_to_60__type_2_diabetes_mellitus"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>{'>'} 60 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__61_and_above__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__61_and_above__type_2_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__61_and_above__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__61_and_above__type_2_diabetes_mellitus"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__61_and_above__type_2_diabetes_mellitus}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__61_and_above__type_2_diabetes_mellitus"
                              />
                            </td>
                          </tr>

                          <tr>
                            <td className={styles.darkBorder}>No. diagnosed for Gestational Diabetes Mellitus</td>
                            <td className={classNames(styles.darkBorder, styles.bgGrey)}>N/A</td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of Diabetes secondary to other causes</td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                          </tr>

                          <tr className={styles.sectionHeader}>
                            <td className={styles.darkBorder} colSpan={4}>
                              HYPERTENSION
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>Cumulative no. of hypertension patients in care</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__cumulative_htn_patient}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__cumulative_htn_patient"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__cumulative_htn_patient}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__cumulative_htn_patient"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.cumulative_htn_patient}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="cumulative_htn_patient"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of newly diagnosed hypertension cases</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__newly_diagnosed_htn_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__newly_diagnosed_htn_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__newly_diagnosed_htn_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__newly_diagnosed_htn_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.newly_diagnosed_htn_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="newly_diagnosed_htn_this_month"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>Revisit to clinic/Known HTN</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__revisit_known_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__revisit_known_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__revisit_known_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__revisit_known_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.revisit_known_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="revisit_known_htn"
                              />
                            </td>
                          </tr>

                          <tr className={styles.subHeader}>
                            <td className={styles.darkBorder} colSpan={4}>
                              No. with hypertension
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>0-9 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__0_to_9__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__0_to_9__has_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__0_to_9__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__0_to_9__has_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__0_to_9__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__0_to_9__has_htn"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>10-19 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__10_to_19__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__10_to_19__has_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__10_to_19__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__10_to_19__has_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__10_to_19__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__10_to_19__has_htn"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>20-35 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__20_to_35__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__20_to_35__has_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__20_to_35__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__20_to_35__has_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__20_to_35__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__range__20_to_35__has_htn"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>36-60 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__36_to_60__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__36_to_60__has_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__36_to_60__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__36_to_60__has_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__36_to_60__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__36_to_60__has_htn"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>{'>'} 60 years</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__age_range__61_and_above__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__age_range__61_and_above__has_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__age_range__61_and_above__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__age_range__61_and_above__has_htn"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__age_range__61_and_above__has_htn}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__age_range__61_and_above__has_htn"
                              />
                            </td>
                          </tr>

                          <tr className={styles.sectionHeader}>
                            <td className={styles.darkBorder} colSpan={4}>
                              CO-MORBID WITH BOTH DIABETES AND HTN PATIENTS
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>
                              Cumulative no. of co-morbid both DM+HTN patients in care
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__is_co_morbid}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__is_co_morbid"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__is_co_morbid}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__is_co_morbid"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.is_co_morbid}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="is_co_morbid"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>Newly diagnosed co-morbid with both DM and HTN cases</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__newly_diagnosed_co_morbid_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__newly_diagnosed_co_morbid_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__newly_diagnosed_co_morbid_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__newly_diagnosed_co_morbid_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.newly_diagnosed_co_morbid_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="newly_diagnosed_co_morbid_this_month"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>Revisit to clinic/Known co-morbid DM and HTN</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__revisit_known_co_morbid}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__revisit_known_co_morbid"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__revisit_known_co_morbid}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__revisit_known_co_morbid"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.revisit_known_co_morbid}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="revisit_known_co_morbid"
                              />
                            </td>
                          </tr>

                          <tr className={styles.sectionHeader}>
                            <td className={styles.darkBorder} colSpan={4}>
                              DIABETES TREATMENT AND FOLLOW UP
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of patients on insulin</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__on_insulin_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__on_insulin_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__on_insulin_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__on_insulin_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.on_insulin_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="on_insulin_this_month"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of patients on OGLAs</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__on_ogla_meds_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__on_ogla_meds_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__on_ogla_meds_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__on_ogla_meds_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.on_ogla_meds_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="on_ogla_meds_this_month"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of patients on both (Insulin and OGLAs)</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__on_both_insulin_and_ogla_meds_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__on_both_insulin_and_ogla_meds_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__on_both_insulin_and_ogla_meds_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__on_both_insulin_and_ogla_meds_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.on_both_insulin_and_ogla_meds_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="on_both_insulin_and_ogla_meds_this_month"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>
                              No. of patients on diet and exercise only (DM and HTN)
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__on_exercise_and_diet}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__on_exercise_and_diet"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__on_exercise_and_diet}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__on_exercise_and_diet"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.on_exercise_and_diet}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="on_exercise_and_diet"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of patients done HbA1c</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__done_hba1c_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__done_hba1c_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__done_hba1c_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__done_hba1c_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.done_hba1c_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="done_hba1c_this_month"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. that met HbA1c target ({'<'} 7%)</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__hba1c_less_than_7_percent_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__hba1c_less_than_7_percent_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__hba1c_less_than_7_percent_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__hba1c_less_than_7_percent_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.hba1c_less_than_7_percent_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="hba1c_less_than_7_percent_this_month"
                              />
                            </td>
                          </tr>

                          <tr className={styles.sectionHeader}>
                            <td className={styles.darkBorder} colSpan={4}>
                              HYPERTENSION TREATMENT
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of patients on antihypertensives</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__on_antihypertensives_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__on_antihypertensives_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__on_antihypertensives_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__on_antihypertensives_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.on_antihypertensives_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="on_antihypertensives_this_month"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. with high BP ({'>='} 140/90) at clinic visit</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__high_bp}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__high_bp"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__high_bp}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__high_bp"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.high_bp}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="high_bp"
                              />
                            </td>
                          </tr>

                          <tr className={styles.sectionHeader}>
                            <td className={styles.darkBorder} colSpan={4}>
                              New Diagnosis of Complications/Comorbidities
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>Stroke</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__stroke_diagnosis}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__stroke_diagnosis"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__stroke_diagnosis}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__stroke_diagnosis"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.stroke_diagnosis}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="stroke_diagnosis"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>Ischemic heart disease</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__ischemic_heart_disease_diagnosis}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__ischemic_heart_disease_diagnosis"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__ischemic_heart_disease_diagnosis}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__ischemic_heart_disease_diagnosis"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.ischemic_heart_disease_diagnosis}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="ischemic_heart_disease_diagnosis"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>Heart failure</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__heart_failure_diagnosis}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__heart_failure_diagnosis"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__heart_failure_diagnosis}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__heart_failure_diagnosis"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.heart_failure_diagnosis}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="heart_failure_diagnosis"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of Patients with neuropathies (new diagnosis)</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__has_neuropathies}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__has_neuropathies"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__has_neuropathies}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__has_neuropathies"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.has_neuropathies}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="has_neuropathies"
                              />
                            </td>
                          </tr>

                          <tr className={styles.sectionHeader}>
                            <td className={styles.darkBorder} colSpan={4}>
                              DIABETIC FOOT
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of patients screened for diabetic foot</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__screened_for_diabetic_foot_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__screened_for_diabetic_foot_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__screened_for_diabetic_foot_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__screened_for_diabetic_foot_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.screened_for_diabetic_foot_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="screened_for_diabetic_foot_this_month"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of patients with diabetic foot (new diagnosis)</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__has_diabetic_foot}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__has_diabetic_foot"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__has_diabetic_foot}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__has_diabetic_foot"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.has_diabetic_foot}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="has_diabetic_foot"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. of Amputation due to diabetic foot</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__amputation_due_to_diabetic_foot}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__amputation_due_to_diabetic_foot"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__amputation_due_to_diabetic_foot}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__amputation_due_to_diabetic_foot"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.amputation_due_to_diabetic_foot}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="amputation_due_to_diabetic_foot"
                              />
                            </td>
                          </tr>

                          <tr className={styles.sectionHeader}>
                            <td className={styles.darkBorder} colSpan={4}>
                              OTHER INDICATORS
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. with kidney complications (new diagnosis)</td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. with diabetic retinopathy (new diagnosis)</td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. Screened for Tuberculosis</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__screened_for_tb_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__screened_for_tb_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__screened_for_tb_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__screened_for_tb_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.screened_for_tb_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="screened_for_tb_this_month"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. Screened Positive for Tuberculosis</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__screened_postive_for_tb_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__screened_postive_for_tb_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__screened_postive_for_tb_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender____screened_postive_for_tb_this_month"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.screened_postive_for_tb_this_month}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="screened_postive_for_tb_this_month"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>No. enrolled with NHIF</td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__M__covered_by_shif}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__M__covered_by_shif"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.dc__gender__F__covered_by_shif}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="dc__gender__F__covered_by_shif"
                              />
                            </td>
                            <td className={styles.darkBorder}>
                              <DataCell
                                value={moh740Data?.covered_by_shif}
                                indicatorSelected={handleIndicatorSelected}
                                indicator="covered_by_shif"
                              />
                            </td>
                          </tr>

                          <tr className={styles.subHeader}>
                            <td className={styles.darkBorder}>Total No. admitted (for only inpatients)</td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>No. admitted with DKA</td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>
                              No. admitted with Hypoglycemia
                            </td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>No. admitted with Stroke</td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                          </tr>
                          <tr>
                            <td className={classNames(styles.darkBorder, styles.indent)}>
                              No. admitted with hypertension urgency/emergency
                            </td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                          </tr>

                          <tr>
                            <td className={styles.darkBorder}>Total deaths due to diabetes complications</td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                          </tr>
                          <tr>
                            <td className={styles.darkBorder}>Total deaths due to hypertension complications</td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                            <td className={styles.darkBorder}></td>
                          </tr>
                        </tbody>
                      </table>

                      <div className={styles.signOff}>
                        <span>Report compiled by:</span>
                        <span>Name</span>
                        <span>Designation</span>
                        <span>Signature</span>
                        <span>Date</span>

                        <span />
                        <span className={styles.signOffRule}>{compiledBy}</span>
                        <span className={styles.signOffRule} />
                        <span className={styles.signOffRule} />
                        <span className={styles.signOffRule}>{compiledOn}</span>
                      </div>
                    </ReportPage>
                  ) : (
                    <ReportPlaceholder reportName="MOH-740" isEmptyResult={hasGenerated} />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
        {view === 'register' && locationUuid && reportingMonth && selectedIndicator && registerType ? (
          <Moh740PatientList
            locationUuid={locationUuid}
            reportingMonth={reportingMonth}
            indicators={selectedIndicator}
            register={registerType}
            onBack={handleBackToReport}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Moh740Report;
