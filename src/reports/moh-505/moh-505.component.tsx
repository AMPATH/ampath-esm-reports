import React, { useEffect, useState } from 'react';
import { formatDate, useSession } from '@openmrs/esm-framework';
import TableWrapper from '../table-wrapper/table-wrapper.component';
import TableRowMapper from '../table-wrapper/table-row-mapper.component';
import { getCell } from '../../utils/utils';
import { ReportFiltersComponent, type ReportPeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { hasReportData, ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { getMoh505 } from '../../resources/moh-505.resource';
import MOH505Header from './moh-505-header.component';
import { useSearchParams } from 'react-router-dom';
import { ReportSkeleton } from '../../common/report-skeleton';
import { ReportPage } from '../../common/report-page';
import styles from './moh-505.scss';

const BAND_UNDER_5 = 'dc__age_range__0_to_4__';
const BAND_5_AND_ABOVE = 'dc__age_range__5_and_above__';

/* The form prints each disease's Cases and Deaths per age band. The flat
   table only carries the Cases flags so far - the per-disease death concepts
   still have to be counterchecked against the 705 A/B procedures, so every
   Deaths cell renders blank until they land. */
const diseases = [
  { label: 'AEFI*', flag: 'aefi' },
  { label: 'Acute Jaundice', flag: 'acute_jaundice' },
  { label: 'Acute Malnutrition', flag: 'acute_malnutrition' },
  { label: 'AFP (Poliomyelitis)**', flag: '' },
  { label: 'Anthrax', flag: 'anthrax' },
  { label: 'Cholera', flag: 'cholera' },
  { label: 'Dengue', flag: 'dengue' },
  { label: 'Dysentery (Bacillary)', flag: 'dysentery_bacillary' },
  { label: 'Guinea Worm Disease', flag: '' },
  { label: 'Measles', flag: 'measles' },
  { label: 'Suspected Malaria***', flag: '' },
  { label: 'Deaths due to Malaria****', flag: '' },
  { label: 'Maternal deaths', flag: 'maternal_deaths' },
];

const diseasesRight = [
  { label: 'Meningococcal Meningitis', flag: 'bacterial_meningitis' },
  { label: 'Neonatal deaths', flag: 'neonatal_deaths' },
  { label: 'Neonatal Tetanus', flag: 'neonatal_tetanus' },
  { label: 'Plague', flag: 'plague' },
  { label: 'Rabies', flag: 'rabies' },
  { label: 'Rift Valley Fever', flag: '' },
  { label: 'SARI (Cluster ≥3 cases)*****', flag: '' },
  { label: 'Suspected MDR/XDR TB', flag: '' },
  { label: 'Typhoid', flag: 'typhoid' },
  { label: 'VHF******', flag: '' },
  { label: 'Yellow Fever', flag: 'yellow_fever' },
  { label: 'Others (Specify)*******', flag: '' },
  { label: '', flag: '' },
];

/** The diseases table's 10-cell body row: label, Cases/Deaths per band, twice */
function diseaseRow(left: { label: string; flag: string }, right: { label: string; flag: string }) {
  const bandCells = (flag: string) => [
    // Cases drill down into the MOH 240 register; Deaths stay blank until the
    // per-disease death concepts are captured by the stored procedure.
    getCell(flag ? `${BAND_UNDER_5}${flag}` : '', ''),
    getCell('', ''),
    getCell(flag ? `${BAND_5_AND_ABOVE}${flag}` : '', ''),
    getCell('', ''),
  ];
  return {
    tableCells: [getCell('', left.label), ...bandCells(left.flag), getCell('', right.label), ...bandCells(right.flag)],
  };
}

const diseaseHeaderRows = [
  {
    tableCells: [
      getCell('', 'Diseases, Conditions or Events', 1, 2, true),
      getCell('', '< 5 years', 2, 1, true),
      getCell('', '≥ 5 years', 2, 1, true),
      getCell('', 'Diseases, Conditions or Events', 1, 2, true),
      getCell('', '< 5 years', 2, 1, true),
      getCell('', '≥ 5 years', 2, 1, true),
    ],
  },
  {
    tableCells: [
      getCell('', 'Cases', 1, 1, true),
      getCell('', 'Deaths', 1, 1, true),
      getCell('', 'Cases', 1, 1, true),
      getCell('', 'Deaths', 1, 1, true),
      getCell('', 'Cases', 1, 1, true),
      getCell('', 'Deaths', 1, 1, true),
      getCell('', 'Cases', 1, 1, true),
      getCell('', 'Deaths', 1, 1, true),
    ],
  },
];

/* The Moh505Report: a report for the current location counts */
const Moh505Report: React.FC = () => {
  const [moh505Data, setMoh505Data] = useState<any>({});
  /* Only a report for the current location counts: after switching location the
     old figures would otherwise be shown, and labelled, as the new location's. */
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation();
  const isReportGenerated = hasReportData(moh505Data) && isForCurrentLocation;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ locationUuids?: string; startDate?: string; endDate?: string }>({});

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;

  /* Masthead and sign-off fill themselves in, as on the other reports */
  const facility = session?.sessionLocation?.display ?? '';
  const compiledBy = session?.user?.person?.display ?? session?.user?.display ?? '';
  const compiledOn = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (startDate && endDate) {
      setFilters({ locationUuids, startDate, endDate });
      fetchMoh505Data({ startDate, endDate });
    }
  }, [searchParams]);

  const fetchMoh505Data = async ({ startDate, endDate }: Pick<ReportPeriod, 'startDate' | 'endDate'>) => {
    setIsLoading(true);

    const params = {
      locationUuids: locationUuids || '',
      startDate,
      endDate,
    };

    try {
      const result = await getMoh505(params);
      const flatData = Object.assign({}, ...result);
      setMoh505Data(flatData);
      markGenerated(params.locationUuids);
      setFilters({ locationUuids: params.locationUuids, startDate, endDate });
    } catch (error: any) {
      showReportError('the MOH-505 report', error);
    } finally {
      setIsLoading(false);
    }
  };

  /* The printed form totals Tested/Positive across the two age bands; the
     aggregate only carries the band columns, so the totals sum them here.
     String(0) stays truthy so zero totals still print; a missing flag keeps
     the cell blank rather than printing a misleading 0. */
  const bandedTotal = (flag: string) => {
    if (!flag) {
      return '';
    }
    const under5 = Number(moh505Data[`${BAND_UNDER_5}${flag}`] ?? 0);
    const fiveAndAbove = Number(moh505Data[`${BAND_5_AND_ABOVE}${flag}`] ?? 0);
    return String(under5 + fiveAndAbove);
  };

  /** Tested/Positive rows for a 7-column lab block: <5, ≥5, Total, twice */
  const labRow = (label: string, first: string, second: string) => ({
    tableCells: [
      getCell('', label),
      getCell(first ? `${BAND_UNDER_5}${first}` : '', ''),
      getCell(first ? `${BAND_5_AND_ABOVE}${first}` : '', ''),
      getCell('', bandedTotal(first)),
      getCell(second ? `${BAND_UNDER_5}${second}` : '', ''),
      getCell(second ? `${BAND_5_AND_ABOVE}${second}` : '', ''),
      getCell('', bandedTotal(second)),
    ],
  });

  /* Malaria block: the mRDT half has its own flags, so it binds directly */
  const malariaRow = (kind: 'tested' | 'positive') => {
    const suffix = kind === 'tested' ? 'malaria_microscopy_tested' : 'malaria_microscopy_positive';
    const mrdt = kind === 'tested' ? 'malaria_mrdt_tested' : 'malaria_mrdt_positive';
    return {
      tableCells: [
        getCell('', kind === 'tested' ? 'Tested' : 'Positive'),
        getCell(`${BAND_UNDER_5}${suffix}`),
        getCell(`${BAND_5_AND_ABOVE}${suffix}`),
        getCell('', bandedTotal(suffix)),
        getCell(`${BAND_UNDER_5}${mrdt}`),
        getCell(`${BAND_5_AND_ABOVE}${mrdt}`),
        getCell('', bandedTotal(mrdt)),
      ],
    };
  };

  const drillDownProps = {
    data: moh505Data,
    locationUuids: filters.locationUuids,
    startDate: filters.startDate,
    endDate: filters.endDate,
    report: 'moh-505',
  };

  const diseaseBodyRows = diseases.map((left, i) => diseaseRow(left, diseasesRight[i]));

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-505 Report"
        mode="both"
        onGenerate={fetchMoh505Data}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && (
        <ReportPlaceholder reportName="MOH-505" isLocationChanged={hasReportData(moh505Data) && hasLocationChanged} />
      )}
      {!isLoading && isReportGenerated && (
        <ReportPage>
          <div className={styles.sheet}>
            <MOH505Header facility={facility} startDate={filters.startDate} endDate={filters.endDate} />

            <TableWrapper>
              <TableRowMapper tableRows={diseaseHeaderRows} />
              <TableRowMapper {...drillDownProps} tableRows={diseaseBodyRows} />
            </TableWrapper>

            <div className={styles.sectionGap} />

            <TableWrapper>
              <TableRowMapper
                tableRows={[
                  {
                    tableCells: [
                      getCell('', 'Disease', 1, 1, true),
                      getCell('', 'Malaria — Microscopy', 3, 1, true),
                      getCell('', 'Malaria — mRDT', 3, 1, true),
                    ],
                  },
                  {
                    tableCells: [
                      getCell('', '', 1, 1, true),
                      getCell('', '<5 yrs', 1, 1, true),
                      getCell('', '≥5 yrs', 1, 1, true),
                      getCell('', 'Total', 1, 1, true),
                      getCell('', '<5 yrs', 1, 1, true),
                      getCell('', '≥5 yrs', 1, 1, true),
                      getCell('', 'Total', 1, 1, true),
                    ],
                  },
                  malariaRow('tested'),
                  malariaRow('positive'),
                ]}
              />
            </TableWrapper>

            <div className={styles.sectionGap} />

            <TableWrapper>
              <TableRowMapper
                tableRows={[
                  {
                    tableCells: [
                      getCell('', 'Disease', 1, 1, true),
                      getCell('', 'Shigella Dysentery', 3, 1, true),
                      getCell('', 'Typhoid — Laboratory diagnosis', 3, 1, true),
                    ],
                  },
                  {
                    tableCells: [
                      getCell('', '', 1, 1, true),
                      getCell('', '<5 yrs', 1, 1, true),
                      getCell('', '≥5 yrs', 1, 1, true),
                      getCell('', 'Total', 1, 1, true),
                      getCell('', '<5 yrs', 1, 1, true),
                      getCell('', '≥5 yrs', 1, 1, true),
                      getCell('', 'Total', 1, 1, true),
                    ],
                  },
                  /* Shigella dysentery has no lab concepts in the flat table
                     yet; typhoid binds its lab tested/positive flags. */
                  labRow('Tested', '', 'typhoid_lab_tested'),
                  labRow('Positive', '', 'typhoid_lab_positive'),
                ]}
              />
            </TableWrapper>

            <div className={styles.sectionGap} />

            <TableWrapper>
              <TableRowMapper
                tableRows={[
                  {
                    tableCells: [
                      getCell('', 'Bacterial Meningitis (CSF)', 1, 1, true),
                      getCell('', 'No CSF', 1, 1, true),
                      getCell('', 'No contaminated', 1, 1, true),
                      getCell('', 'No Tested', 1, 1, true),
                      getCell('', '+ve Nm', 1, 1, true),
                      getCell('', '+ve Sp', 1, 1, true),
                      getCell('', '+ve H. influenza', 2, 1, true),
                    ],
                  },
                  {
                    /* Only "No CSF" has a captured concept so far; the rest
                       print blank until the CSF block concepts exist. */
                    tableCells: [
                      getCell('', 'CSF results'),
                      getCell('', bandedTotal('meningitis_no_csf')),
                      getCell('', ''),
                      getCell('', ''),
                      getCell('', ''),
                      getCell('', ''),
                      getCell('', '', 2),
                    ],
                  },
                ]}
              />
            </TableWrapper>

            <div className={styles.sectionGap} />

            <TableWrapper>
              <TableRowMapper
                tableRows={[
                  {
                    tableCells: [
                      getCell('', 'No of CSF Sub-Typed', 1, 1, true),
                      getCell('', '+ve NmA', 1, 1, true),
                      getCell('', '+ve NmB', 1, 1, true),
                      getCell('', '+ve NmC', 1, 1, true),
                      getCell('', '+ve NmW 135', 1, 1, true),
                      getCell('', '+ve NmX', 1, 1, true),
                      getCell('', '+ve NmY', 1, 1, true),
                      getCell('', 'Indeterminate', 1, 1, true),
                    ],
                  },
                  {
                    /* CSF sub-typing has no captured concepts yet */
                    tableCells: [
                      getCell('', ''),
                      getCell('', ''),
                      getCell('', ''),
                      getCell('', ''),
                      getCell('', ''),
                      getCell('', ''),
                      getCell('', ''),
                      getCell('', ''),
                    ],
                  },
                ]}
              />
            </TableWrapper>

            <div className={styles.sectionGap} />

            <TableWrapper>
              <TableRowMapper
                tableRows={[
                  {
                    tableCells: [
                      getCell('', 'Tuberculosis (MDR/XDR)', 1, 1, true),
                      getCell('', '< 5 years', 1, 1, true),
                      getCell('', '≥ 5 years', 1, 1, true),
                    ],
                  },
                  {
                    /* TB MDR/XDR has no captured concepts yet */
                    tableCells: [getCell('', 'Tested'), getCell('', ''), getCell('', '')],
                  },
                  {
                    tableCells: [getCell('', 'Positive'), getCell('', ''), getCell('', '')],
                  },
                ]}
              />
            </TableWrapper>

            <p className={styles.notes}>
              *AEFI: Adverse Events Following Immunisation &nbsp;|&nbsp; **AFP: Acute Flaccid Paralysis &nbsp;|&nbsp;
              ***Suspected malaria includes OPD and IPD cases. &nbsp;|&nbsp; ****Deaths due to malaria include all ages.
              &nbsp;|&nbsp; *****SARI cluster: three or more cases in the same week. &nbsp;|&nbsp; ******VHF: Viral
              Haemorrhagic Fever. &nbsp;|&nbsp; *******Specify other diseases/conditions not listed above.
            </p>

            <div className={styles.signOff}>
              <span>
                Compiled by:<span className={styles.line}>{compiledBy}</span>
              </span>
              <span>
                Signature:
                <span className={styles.line} />
              </span>
              <span>
                Date:<span className={styles.shortLine}>{compiledOn}</span>
              </span>
            </div>
          </div>
        </ReportPage>
      )}
    </>
  );
};

export default Moh505Report;
