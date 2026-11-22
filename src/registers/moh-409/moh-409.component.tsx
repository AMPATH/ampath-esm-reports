import { useSession } from '@openmrs/esm-framework';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RegisterLayout, usePatientList } from '../../common/report-register';
import { ReportFiltersComponent, type ReportPeriod } from '../../common/report-filters';
import { getMoh409Register } from '../../resources/moh-713.resource';

import styles from './moh-409.scss';
import classNames from 'classnames';
import { moh409ExportColumns } from './moh-409.columns';

interface Moh409ComponentProps {}

const Moh409Component: React.FC<Moh409ComponentProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const session = useSession();
  const [generatedPeriod, setGeneratedPeriod] = useState<{ startDate: string; endDate: string } | null>(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    return startDate && endDate ? { startDate, endDate } : null;
  });
  const isGenerated = Boolean(generatedPeriod);

  const startDate = generatedPeriod?.startDate ?? searchParams.get('startDate');
  const endDate = generatedPeriod?.endDate ?? searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids') ?? session?.sessionLocation?.uuid ?? '';
  const indicator = searchParams.get('indicator');

  const {
    rows: patientlist,
    total,
    isTotalExact,
    isLoading,
    page,
    pageSize,
    onPageChange,
    fetchAll,
  } = usePatientList(
    ({ startIndex, limit }) => {
      if (!generatedPeriod) {
        return Promise.resolve({ results: [], total: 0, isTotalExact: true });
      }

      return getMoh409Register({
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
        locationUuids,
        indicator: indicator ?? undefined,
        startIndex,
        limit,
      });
    },
    [startDate, endDate, locationUuids, indicator, generatedPeriod],
  );

  const generate = ({ startDate, endDate }: ReportPeriod) => {
    setGeneratedPeriod({ startDate, endDate });
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set('startDate', startDate);
      nextParams.set('endDate', endDate);
      if (!nextParams.has('locationUuids') && locationUuids) {
        nextParams.set('locationUuids', locationUuids);
      }
      return nextParams;
    });
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-409 Register"
        mode="both"
        defaultTab="custom"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={Boolean(generatedPeriod)}
        generatedPeriod={generatedPeriod ?? undefined}
        backLink={{ label: 'All registers', to: '/?tab=registers' }}
      />
      <RegisterLayout
        parentLabel="All registers"
        parentPath="/?tab=registers"
        hideBreadcrumb
        title="MOH-409 Register"
        isLoading={isLoading}
        isEmpty={isGenerated && patientlist?.length === 0}
        page={page}
        pageSize={pageSize}
        total={total}
        isTotalExact={isTotalExact}
        onPageChange={onPageChange}
        fetchAll={isGenerated ? fetchAll : undefined}
        columns={moh409ExportColumns}
      >
        <h5 className={styles.mainTitleBox}>DAILY ACTIVITY REGISTER FOR NUTRITION COMMODITIES MOH 409</h5>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th colSpan={4}></th>
                <th colSpan={3}>Therapeutic food products</th>
                <th colSpan={6}></th>
                <th>Micronutrients</th>
                <th>Others</th>
              </tr>
              <tr>
                <th></th>
                <th colSpan={4}></th>
                <th>
                  Therapeutic <br />
                  diet milk
                  <br />
                  (F-100), <br />
                  75kcal/10g
                </th>
                <th>
                  Therapeutic <br />
                  diet milk
                  <br />
                  (F-75), <br />
                  100kcal/10g
                </th>
                <th>
                  Ready to use <br /> therapeutic <br /> food (RUTF) <br /> paste, <br /> 500kcal/92g <br />
                  (e.g Plumpy <br />
                  Nut)
                </th>
                <th>
                  Ready to use <br /> therapeutic <br /> food (RUSF) <br /> paste, <br /> 500kcal/92g <br />
                  (e.g Plumpy <br />
                  Soy)
                </th>
                <th colSpan={2}>
                  Corn Soy Blend <br />
                  flour, 390kcal/100g
                </th>
                <th>
                  Fortified <br /> blended food ,<br /> 514kcal/100g <br /> [for children <br /> aged 6 months <br /> -
                  9 years]
                </th>
                <th>
                  Fortified <br /> blended food <br /> [for Adults and <br /> Adolescents (10 <br /> - 17 years)]
                </th>
                <th>
                  Fortified <br /> blended food <br /> [for Pregnant <br /> women and post <br /> -Partum mothers]{' '}
                  <br /> 450kcal/100g
                </th>
                <th>
                  Micronutrient <br /> Powder
                </th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th colSpan={4}>Unit of measurement</th>
                <th>400g tin</th>
                <th>400g tin</th>
                <th>1 sachet of 92g</th>
                <th>1 sachet of 92g</th>
                <th>300g Sachets</th>
                <th>1.5kg Packet</th>
                <th>Bag of 15 sachets of 200g</th>
                <th>Bag of 15 sachets of 300g</th>
                <th>Bag of 15 sachets of 200g</th>
                <th>1 sachet of 1g</th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th colSpan={4}>Opening Balance (A)</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th colSpan={4}>Quantity Received (B)</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th colSpan={4}>Stock on Hand(C) (A + B)</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th>SNO</th>
                <th>Date:</th>
                <th>Client Unique Number</th>
                <th> Client Name</th>
                <th>
                  Serostatus
                  <br />
                  (P/N/HEI/U)
                </th>
                <th colSpan={11}>QUANTITY ISSUED</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <th colSpan={4}>Page Total of Quantity Dispensed(D)</th>
                <td></td>
                <td></td>
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
                <td></td>
                <th colSpan={4}>Page Total of QTY Dispensed for HIV+ Clients</th>
                <td></td>
                <td></td>
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
                <td></td>
                <th colSpan={4}>Total HIV+ Clients reveiving Item</th>
                <td></td>
                <td></td>
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
                <td></td>
                <th colSpan={4}>Closing Balance (E)</th>
                <td></td>
                <td></td>
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
      </RegisterLayout>
    </>
  );
};

export default Moh409Component;
