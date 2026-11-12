import React, { useState } from 'react';
import styles from './moh-718.component.scss';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';
import { type ReportPeriod } from '../../common/report-filters/types';
import { useSession } from '@openmrs/esm-framework';
import { showReportError } from '../../common/report-error/show-report-error';
import { ReportSkeleton } from '../../common/report-skeleton';
import { hasReportData, ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { ReportPage } from '../../common/report-page';
const Moh718Report: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation();
    const session = useSession();
    const [moh718Data, setMoh718Data] = useState<any>(null);
    // const isReportGenerated = hasReportData(moh718Data) && isForCurrentLocation;
    const isReportGenerated = true;
      const locationUuids = session?.sessionLocation?.uuid;
      const fetchMoh718ReportData = async ({ startDate, endDate }: ReportPeriod) => {
        setIsLoading(true);
        setStartDate(startDate);
        setEndDate(endDate);
    
        const params = {
          locationUuids: locationUuids || '',
          startDate,
          endDate,
        };
        try {
          const data = await [];
          if(data){
               setMoh718Data(data);
               markGenerated(params.locationUuids);
          }else{
            setMoh718Data(null);
          } 
        } catch (error) {
          showReportError('the MOH-718 report', error);
        }finally{
            setIsLoading(false);
        }
      };
  return (
    <>
     <ReportFiltersComponent
        reportName="MOH-745 Report"
        mode="both"
        onGenerate={fetchMoh718ReportData}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={{ startDate, endDate }}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && (
        <ReportPlaceholder reportName="MOH-718" isLocationChanged={hasReportData(moh718Data) && hasLocationChanged} />
      )}
       {!isLoading && isReportGenerated && (
        <ReportPage>
      <div>
        <div className={styles.reportTitle}>
          <h6>MOH 718 - Inpatient Morbidity and Mortality</h6>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Certain conditions originating in the perinatal period</div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Certain conditions orig in the perinatal period</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Certain infectius and parasitic diseases</div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Diarrhoea and GE</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Other intestinal infectious </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Cholera Inpatient </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Diphtheria</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Respiratory Tuberculosis</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Malaria Inpatient </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Plague Inpatient</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Septicaemia </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Trypanosomiasis </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Whooping Cough </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Viral Hepatitis </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Yellow Fever </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Schistosomiasis </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Tetanus Inpatient </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Other Tuberculosis </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Leishmaniasis </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Congenital malformations, deformations and chromosomal abnormalities </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Congenital malformations, deformations and chromosomal abnormalities</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Diseases of blood and blood forming organs</div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Anaemias </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Remainder of diseases of the blood </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Diseases of the circulatory system </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Acute rheumatic fever and chronic rheumatic heart diseases </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Hypertensive diseases </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Ischaemic heart diseases </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Other heart diseases </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Atherosclerosis </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Remainder of diseases of the circulatory system </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Diseases of the digestive system</div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Gastric and duodenal ulcer </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Diseases of the liver </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Remainder of diseases of the digestive system</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Diseases of the ear and mastoid process</div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Diseases of the ear and mastoid process </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Diseases of the eye and adnexa</div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Diseases of the eye and adnexa </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Diseases of the genitourinary system </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Glomerular and renal tubulointerstitial diseases </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Remainder of diseases of the genitourinary system </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Diseases of the musculoskeletal system and connective tissue </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}> Diseases of the musculoskeletal system and connective tissue</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Diseases of the respiratory system </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}> Influenza </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}> Pneumonia Inpatient  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Other acute lower respiratory infections </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
               <tr>
                <td colSpan={2}>Chronic lower respiratory diseases  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}> Remainder of diseases of the respiratory system  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Diseases of the skin and subcutaneous tissue  </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}> Diseases of the skin and subcutaneous tissue</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Endocrine, nutritional and metabolic diseases   </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}> Diabetes mellitus </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}> Malnutrition Inpatient  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}> Remainder of endocrine, nutritional and metabolic diseases  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>External causes of morbidity and Mortality</div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Transport accidents</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Falls</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Accidental drowning and submersion</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
               <tr>
                <td colSpan={2}>Exposure to smoke, fire and flames </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
             <tr>
                <td colSpan={2}>Accidental poisoning by and exposure to noxious substances </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Intentional self-harm  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Assault   </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Assault   </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>All other external causes    </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Mental and behavioural disorders   </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Mental and behavioural disorders due to psychoactive substance use</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Remainder of mental and behavioural disorders </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Neoplasm </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Ca of colon, rectum and anus </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Ca of lip, oral cavity and pharynx </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            <tr>
                <td colSpan={2}>Ca of oesophagus </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
               <tr>
                <td colSpan={2}>Ca of stomach </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Ca of bladder  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
               <tr>
                <td colSpan={2}>Ca of breast  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Ca of cervix uteri   </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Ca of larynx   </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
               <tr>
                <td colSpan={2}>Ca of liver and intrahepatic bile ducts    </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
                <tr>
                <td colSpan={2}>Ca of meninges, brain, central nervous system    </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
               <tr>
                <td colSpan={2}>Ca of other and unspecified parts of uterus     </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
               <tr>
                <td colSpan={2}>Ca of ovary     </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Ca of pancreas </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
               <tr>
                <td colSpan={2}>Ca of prostate  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Ca of trachea, bronchus and lung   </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Pregnancy, childbirth and the puerperium </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Pregnancy with abortive outcome </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Other direct obstetric deaths  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
               <tr>
                <td colSpan={2}>Indirect obstetric deaths  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
               <tr>
                <td colSpan={2}>Remainder of pregnancy, childbirth and the puerperium  </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
         <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={10}>Male</th>
                <th colSpan={10}>Female</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
                <th colSpan={2}>1 yrs</th>
                <th colSpan={2}>1-4 yrs</th>
                <th colSpan={2}>5-14 yrs</th>
                <th colSpan={2}>15-44 yrs</th>
                <th colSpan={2}>45+ yrs</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>Symptoms, signs and abnormal clinical and laboratory findings</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            
              
            
            </tbody>
          </table>
        </div>
      </div>
      </ReportPage>)}
    </>
  );
};

export default Moh718Report;
