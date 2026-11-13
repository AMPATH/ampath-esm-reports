import React, { useState } from "react";
import styles from './moh-301.register.scss';
import ReportFiltersComponent from "../../../../common/report-filters/report-filters.component";
import { type ReportPeriod } from "../../../../common/report-filters/types";
import dayjs from "dayjs";
import { useSession } from "@openmrs/esm-framework";
import { useGeneratedLocation } from "../../../../common/report-placeholder/use-generated-location";
import { showReportError } from "../../../../common/report-error/show-report-error";
import { columnsToCsv, downloadCsv } from "../../../../common/report-register/rows-to-csv";
const Moh301Register: React.FC = ()=>{
const [isLoading,setIsLoading] = useState<boolean>(false);
const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
const session = useSession();
 const [rows, setRows] = useState<any[]>([]);
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('moh301Location');
  const isGenerated = rows !== null && isForCurrentLocation;
  const [isExporting, setIsExporting] = useState(false);
const generate = async ({ startDate, endDate }: ReportPeriod) => {
          setIsLoading(true);
          setPeriod({ startDate, endDate });
          const selectedDate =  dayjs(startDate).endOf('month')
          const registerStartDate = selectedDate.format('YYYY-MM-DD');
         
      };
const exportCsv = async () => {
          setIsExporting(true);
      
          try {
            const slug = ['moh-222-dailly-register', period.startDate, period.endDate]
              .filter(Boolean)
              .join('-')
              .toLowerCase();
            downloadCsv(columnsToCsv(rows, [], { subHeaderRow: [] }), `${slug}.csv`);
          } catch (error) {
            showReportError('the register export', error);
          } finally {
            setIsExporting(false);
          }
};
 return <>
 <div className={styles.registerContainer}>
    <div>
          <ReportFiltersComponent
            reportName="MOH 301 Inpatient Register"
            mode="both"
            onGenerate={generate}
            isLoading={isLoading}
            isReportGenerated={isGenerated}
            generatedPeriod={period}
            defaultTab="monthly"
            backLink={{ label: 'All registers', to: '/?tab=registers' }}
          />
    </div>
  <header className={styles.header}>
    <h4 className={styles.mainTitle}>REPUBLIC OF KENYA - MINISTRY OF HEALTH</h4>
    <h5 className={styles.subTitle}>INPATIENT (IP) REGISTER - MOH 301 | REVISED APRIL 2019</h5>
  </header>

  <section className={styles.metadataSection}>
    <div className={styles.metadataRow}>
      <div className={styles.metadataField}>
        <label className={styles.metadataLabel}>County:</label>
        <span className={styles.metadataValue}></span>
      </div>
      <div className={styles.metadataField}>
        <label className={styles.metadataLabel}>Sub-County:</label>
        <span className={styles.metadataValue}></span>
      </div>
      <div className={styles.metadataField}>
        <label className={styles.metadataLabel}>Health Facility:</label>
        <span className={styles.metadataValue}></span>
      </div>
      <div className={styles.metadataField}>
        <label className={styles.metadataLabel}>KMHFL Code:</label>
        <span className={styles.metadataValue}></span>
      </div>
      <div className={styles.metadataField}>
        <label className={styles.metadataLabel}>Type:</label>
        <span className={styles.metadataValue}></span>
      </div>
      <div className={styles.metadataField}>
        <label className={styles.metadataLabel}>Agency:</label>
        <span className={styles.metadataValue}></span>
      </div>
    </div>

    <div className={styles.metadataRow}>
      <div className={styles.metadataField}>
        <label className={styles.metadataLabel}>Start Date:</label>
        <span className={styles.metadataValue}></span>
      </div>
      <div className={styles.metadataField}>
        <label className={styles.metadataLabel}>End Date:</label>
        <span className={styles.metadataValue}></span>
      </div>
    </div>
  </section>

  <div className={styles.tableWrapper}>
    <table className={styles.registerTable}>
      <thead className={styles.tableHead}>
        <tr className={styles.headerRow}>
          <th className={styles.tableHeaderCell}>Date of Admission</th>
          <th className={styles.tableHeaderCell}>In-patient No.</th>
          <th className={styles.tableHeaderCell}>Full Names (three names)</th>
          <th className={styles.tableHeaderCell}>Age in Years</th>
          <th className={styles.tableHeaderCell}>Sex</th>
          <th className={styles.tableHeaderCell}>County / Sub-County</th>
          <th className={styles.tableHeaderCell}>Village / Estate / Landmark</th>
          <th className={styles.tableHeaderCell}>Telephone Number</th>
          <th className={styles.tableHeaderCell}>
            HIV Intervention
            <span className={styles.headerLegend}>1=Counselled 2=Tested 3=Not Done</span>
          </th>
          <th className={styles.tableHeaderCell}>
            HIV Status
            <span className={styles.headerLegend}>1=Known Positive 2=Positive this visit 3=Negative 4=Unknown</span>
          </th>
          <th className={styles.tableHeaderCell}>Diagnosis</th>
          <th className={styles.tableHeaderCell}>Treatment / Prescription</th>
          <th className={styles.tableHeaderCell}>
            Nutrition Support
            <span className={styles.headerLegend}>1=Assessment 2=Education 3=Supplements</span>
          </th>
          <th className={styles.tableHeaderCell}>Date of Discharge</th>
          <th className={styles.tableHeaderCell}>
            Outcome
            <span className={styles.headerLegend}>A=Alive D=Dead ABS=Absconded</span>
          </th>
          <th className={styles.tableHeaderCell}>Cause of Death / N/A</th>
          <th className={styles.tableHeaderCell}>
            Referral In
            <span className={styles.headerLegend}>1=Other HF 2=CU</span>
          </th>
          <th className={styles.tableHeaderCell}>
            Referral Out
            <span className={styles.headerLegend}>3=Other HF 4=CU</span>
          </th>
          <th className={styles.tableHeaderCell}>Remarks</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {/* Sample empty entry row (repeat as needed for the 50 register rows) */}
        <tr className={styles.tableRow}>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
          <td className={styles.tableCell}></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
 </>
}
export default Moh301Register;