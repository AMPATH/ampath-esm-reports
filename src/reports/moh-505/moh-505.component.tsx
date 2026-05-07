import React, { useState } from 'react';
import { useSession } from '@openmrs/esm-framework';
import { Loading } from '@carbon/react';
import TableWrapper from '../table-wrapper/table-wrapper.component';
import TableRowMapper from '../table-wrapper/table-row-mapper.component';
import { getCell } from '../../utils/utils';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';
import { getMoh505 } from '../../resources/moh-505.resource';
import MOH505Header from './moh-505-header.component';

const Moh505Report: React.FC = () => {
  const [moh505Data, setMoh505Data] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filters, setFilters] = useState<{ locationUuids?: string; startDate?: string; endDate?: string }>({});

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;

  const fetchMoh505Data = async (filters: { startDate?: string; endDate?: string; month?: string }) => {
    setErrorMessage('');
    setIsLoading(true);

    let startDate = filters.startDate;
    let endDate = filters.endDate;

    if (filters.month) {
      const [year, monthIndex] = filters.month.split('-').map(Number);
      const start = new Date(year, monthIndex - 1, 1);
      const end = new Date(year, monthIndex, 0);

      const formatLocalDate = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      };

      startDate = formatLocalDate(start);
      endDate = formatLocalDate(end);
    }

    const params = {
      locationUuids: locationUuids || '',
      startDate,
      endDate,
    };

    try {
      const result = await getMoh505(params);
      const flatData = Object.assign({}, ...result);
      setMoh505Data(flatData);
      setFilters({ locationUuids: params.locationUuids, startDate, endDate });
    } catch (error: any) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  // Static table rows for now - can be updated to use moh505Data
  const tableRows = [
    {
      tableCells: [
        getCell('', 'Diseases, Conditions or Events', 1, 2, true),
        getCell('', '< 5 years', 2, 1, true),
        getCell('', '≥ 5 years', 6, 1, true),
        getCell('', 'Diseases, Conditions or Events', 1, 2, true),
        getCell('', '< 5 years', 2, 1, true),
        getCell('', '≥ 5 years', 2, 1, true),
      ],
    },
    {
      tableCells: [
        ,
        getCell('', 'Cases', 1, 1, true),
        getCell('', 'Deaths', 1, 1, true),
        getCell('', 'Cases', 1, 1, true),
        getCell('', 'Deaths', 5, 1, true),
        ,
        getCell('', 'Cases', 1, 1, true),
        getCell('', 'Deaths', 1, 1, true),
        getCell('', 'Cases', 1, 1, true),
        getCell('', 'Deaths', 1, 1, true),
      ],
    },
    {
      tableCells: [
        getCell('', 'AEFI*'),
        getCell('dc__age_range__0_to_4__aefi'),
        getCell(),
        getCell('dc__age_range__5_and_above__aefi'),
        getCell('', '', 5),
        getCell('', 'Meningococcal Meningitis'),
        getCell('dc__age_range__0_to_4__bacterial_meningitis'),
        getCell(),
        getCell('dc__age_range__5_and_above__bacterial_meningitis'),
        getCell(),
      ],
    },
    {
      tableCells: [
        getCell('', 'Acute Jaundice'),
        getCell('dc__age_range__0_to_4__acute_jaundice', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__acute_jaundice', ''),
        getCell('', '', 5),
        getCell('', 'Neonatal deaths'),
        getCell('dc__age_range__0_to_4__neonatal_deaths', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__neonatal_deaths', ''),
        getCell('', '', 2, 2),
      ],
    },
    {
      tableCells: [
        getCell('', 'Acute Malnutrition'),
        getCell('dc__age_range__0_to_4__acute_malnutrition', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__acute_malnutrition', ''),
        getCell('', '', 5),
        getCell('', 'Neonatal Tetanus'),
        getCell('dc__age_range__0_to_4__neonatal_tetanus', ''),
        getCell(),
      ],
    },
    {
      tableCells: [
        getCell('', 'AFP (Poliomyelitis)**'),
        getCell(),
        getCell(),
        getCell(),
        getCell('', '', 5),
        getCell('', 'Plague'),
        getCell('dc__age_range__0_to_4__plague', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__plague', ''),
        getCell(),
      ],
    },
    {
      tableCells: [
        getCell('', 'Anthrax'),
        getCell('dc__age_range__0_to_4__anthrax', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__anthrax', ''),
        getCell('', '', 5),
        getCell('', 'Rabies'),
        getCell('dc__age_range__0_to_4__rabies', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__rabies', ''),
        getCell(),
      ],
    },
    {
      tableCells: [
        getCell('', 'Cholera'),
        getCell('dc__age_range__0_to_4__cholera', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__cholera', ''),
        getCell('', '', 5),
        getCell('', 'Rift Valley Fever'),
        getCell(),
        getCell(),
        getCell(),
        getCell(),
      ],
    },
    {
      tableCells: [
        getCell('', 'Dengue'),
        getCell('dc__age_range__0_to_4__dengue', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__dengue', ''),
        getCell('', '', 5),
        getCell('', 'SARI (Cluster ≥3 cases)*****'),
        getCell(),
        getCell(),
        getCell(),
        getCell(),
      ],
    },
    {
      tableCells: [
        getCell('', 'Dysentery (Bacillary)'),
        getCell('dc__age_range__0_to_4__dysentery_bacillary', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__dysentery_bacillary', ''),
        getCell('', '', 5),
        getCell('', 'Suspected MDR/XDR TB'),
        getCell(),
        getCell(),
        getCell(),
        getCell(),
      ],
    },
    {
      tableCells: [
        getCell('', 'Guinea Worm Disease'),
        getCell(),
        getCell(),
        getCell(),
        getCell('', '', 5),
        getCell('', 'Typhoid'),
        getCell('dc__age_range__0_to_4__typhoid', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__typhoid', ''),
        getCell(),
      ],
    },
    {
      tableCells: [
        getCell('', 'Measles'),
        getCell('dc__age_range__0_to_4__measles', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__measles', ''),
        getCell('', '', 5),
        getCell('', 'VHF******', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
      ],
    },
    {
      tableCells: [
        getCell('', 'Suspected Malaria***'),
        getCell(),
        getCell(),
        getCell(),
        getCell('', '', 5),
      ],
    },
    {
      tableCells: [
        getCell('', 'Deaths due to Malaria****', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 5, 2),
        getCell('', 'Yellow Fever', 1, 2),
        getCell('dc__age_range__0_to_4__yellow_fever', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('dc__age_range__5_and_above__yellow_fever', '', 1, 2),
        getCell('', '', 1, 2),
      ],
    },
    {
      tableCells: [,],
    },
    {
      tableCells: [
        getCell('', 'Maternal deaths'),
        getCell('dc__age_range__0_to_4__maternal_deaths', ''),
        getCell(),
        getCell('dc__age_range__5_and_above__maternal_deaths', ''),
        getCell('', '', 5),
        getCell('', 'Others (Specify)*******'),
        getCell(),
        getCell(),
        getCell(),
        getCell(),
      ],
    },
    {
      tableCells: [getCell('', '', 14)],
    },
    {
      tableCells: [
        getCell('', 'Disease', 1, 1, true),
        getCell('', 'Microscopy', 3, 1, true),
        getCell('', 'mRDT', 5, 1, true),
        getCell('', 'Disease', 2, 1, true),
        getCell('', 'Laboratory diagnosis', 3, 1, true),
      ],
    },
    {
      tableCells: [
        getCell('', 'Malaria', 1, 1, true),
        getCell('', '<5 yrs'),
        getCell('', '≥5 yrs'),
        getCell('', 'Total'),
        getCell('', '<5 yrs', 2),
        getCell('', '≥5 yrs', 3),
        getCell('', 'Shigella Dysentery', 2, 1, true),
        getCell('', '<5 yrs', 2),
        getCell('', '≥5 yrs', 1),
      ],
    },
    {
      tableCells: [
        getCell('', 'Tested'),
        getCell('dc__age_range__0_to_4__malaria_microscopy_tested', ''),
        getCell('dc__age_range__5_and_above__malaria_microscopy_tested', ''),
        getCell(),
        getCell('dc__age_range__0_to_4__malaria_mrdt_tested', '', 2),
        getCell('dc__age_range__5_and_above__malaria_mrdt_tested', '', 3),
        getCell('', 'Tested', 2),
        getCell('dc__age_range__0_to_4__typhoid_lab_tested', '', 2),
        getCell('dc__age_range__5_and_above__typhoid_lab_tested', '', 1),
      ],
    },
    {
      tableCells: [
        getCell('', 'Positive'),
        getCell('dc__age_range__0_to_4__malaria_microscopy_positive', ''),
        getCell('dc__age_range__5_and_above__malaria_microscopy_positive', ''),
        getCell(),
        getCell('dc__age_range__0_to_4__malaria_mrdt_positive', '', 2),
        getCell('dc__age_range__5_and_above__malaria_mrdt_positive', '', 3),
        getCell('', 'Positive', 2),
        getCell('dc__age_range__0_to_4__typhoid_lab_positive', '', 2),
        getCell('dc__age_range__5_and_above__typhoid_lab_positive', '', 1),
      ],
    },
    {
      tableCells: [
        getCell('', 'Bacterial Meningitis', 1, 2, true),
        getCell('', 'No CSF', 1, 2, true),
        getCell('', 'No contaminated', 1, 2, true),
        getCell('', 'No Tested', 1, 2, true),
        getCell('', '+ve Nm', 1, 2, true),
        getCell('', '+ve Sp', 1, 2, true),
        getCell('', '+ve H influenza', 3, 2, true),
        getCell('', 'Tuberculosis (MDR/XDR)', 2, 2, true),
        getCell('', '<5 yrs', 2, 2),
        getCell('', '≥5 yrs', 1, 2),
      ],
    },
    {
      tableCells: [,],
    },
    {
      tableCells: [
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 2, 2),
        getCell('', 'Tested', 2),
        getCell('', '', 2),
        getCell(),
      ],
    },
    {
      tableCells: [, , , , , , , , getCell('', 'Positive', 2), getCell('', '', 2), getCell()],
    },
    {
      tableCells: [
        getCell('', 'No of CSF Sub-Typed', 1, 2, true),
        getCell('', '+ve NmA', 1, 2, true),
        getCell('', '+ve NmB', 1, 2, true),
        getCell('', '+ve NmC', 1, 2, true),
        getCell('', '+ve NmW 135', 1, 2, true),
        getCell('', '+ve NmX', 1, 2, true),
        getCell('', '+ve NmY', 1, 2, true),
        getCell('', 'Indeterminate', 1, 2, true),
        getCell('', 'Hib', 1, 2, true),
        getCell('', 'Typhoid', 2, 2, true),
        getCell('', '< 5 years', 2, 2),
        getCell('', '≥ 5 years', 1, 2),
      ],
    },
    {
      tableCells: [,],
    },
    {
      tableCells: [
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', '', 1, 2),
        getCell('', 'Tested', 2),
        getCell('', '', 2),
        getCell('', '', 1),
      ],
    },
    {
      tableCells: [, , , , , , , , , getCell('', 'Positive', 2, 1), getCell('', '', 2, 1), getCell('', '', 1, 1)],
    },
    {
      tableCells: [,],
    },
  ];

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-505 Report"
        mode="monthly"
        onGenerate={fetchMoh505Data}
        isLoding={isLoading}
      />
      {isLoading && <Loading description="Fetching data...." />}
      {!isLoading && errorMessage && (
        <div>
          <a href="#" className="close" data-dismiss="alert">
            &times;
          </a>
          <h4>
            <strong>
              <span className="glyphicon glyphicon-warning-sign"></span>{' '}
            </strong>{' '}
            An error occurred while trying to load the report. Please try again.
          </h4>
          <p>
            <small>{errorMessage}</small>
          </p>
        </div>
      )}
      <MOH505Header />
      <TableWrapper>
        <TableRowMapper tableRows={tableRows} data={moh505Data} locationUuids={filters.locationUuids} startDate={filters.startDate} endDate={filters.endDate} report='moh-505' />
      </TableWrapper>
    </>
  );
};

export default Moh505Report;