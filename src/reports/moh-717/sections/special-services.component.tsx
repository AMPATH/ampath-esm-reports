import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';

interface SpecialServicesComponentProps {
  moh717ReportData: any;
}

const SpecialServicesComponent: React.FC<SpecialServicesComponentProps> = ({ moh717ReportData }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={6} className={classNames(`${styles.totals} ${styles.alighnLeft}`)}>
              C.SPECIAL SERVICES (includes both inpatients and outpatients)
            </th>
          </tr>
          <tr>
            <th></th>
            <th colSpan={2}>Services</th>
            <th>Number</th>
            <th>Services</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>C.1</td>
            <td>Laboratory- Number of Tests</td>
            <td>Routine</td>
            <td>{moh717ReportData.lab_routine_test}</td>
            <td>Special</td>
            <td>{moh717ReportData.lab_special_test}</td>
          </tr>
          <tr>
            <td rowSpan={6}>C.2</td>
            <td rowSpan={6}>X-Ray & Imaging- Number of Examinations</td>
            <th>Routine</th>
            <th>Number</th>
            <th>Special</th>
            <th>Number</th>
          </tr>
          <tr>
            <td rowSpan={5}>Plain X-Rays without contrast enhancement</td>
            <td rowSpan={5}>{moh717ReportData.plain_xray_without_enhancement}</td>
            <td>Contrast enhanced examinations</td>
            <td>{moh717ReportData.contrast_enhancement_examination}</td>
          </tr>
          <tr>
            <td>Magnetic Resonance Imaging</td>
            <td>{moh717ReportData.magnetic_resonance_imaging}</td>
          </tr>
          <tr>
            <td>Computarized Tomography</td>
            <td>{moh717ReportData.computerized_tomography}</td>
          </tr>
          <tr>
            <td>Mammography</td>
            <td>{moh717ReportData.mammography}</td>
          </tr>
          <tr>
            <td>Chest x-ray for PTB with specialist's report</td>
            <td>{moh717ReportData.chest_xray_for_ptb}</td>
          </tr>
          <tr>
            <td>C.3</td>
            <td>Number of ultrasound examinations</td>
            <td>General ultrasound</td>
            <td>{moh717ReportData.general_ultrasound}</td>
            <td>Obstetric ultrasound</td>
            <td>{moh717ReportData.obstetric_ultrasound}</td>
          </tr>
          <tr>
            <td>C.4</td>
            <th colSpan={2}>Total routine (X-Ray and Imaging)</th>
            <th>{moh717ReportData.total_routine_xray_and_imaging}</th>
            <th>Total special exams (X-Ray and Imaging)</th>
            <th>{moh717ReportData.total_special_exams_xray_and_imaging}</th>
          </tr>
          <tr>
            <td>C.5</td>
            <td colSpan={4}>Physiotherapy - Number of Treatments</td>
            <td>{moh717ReportData.physiotherapy_number_of_treatments}</td>
          </tr>
          <tr>
            <td>C.6</td>
            <td colSpan={4}>Occupational therapy - Number of treatments</td>
            <td>{moh717ReportData.occupational_therapy_number_of_treatments}</td>
          </tr>
          <tr>
            <td>C.7</td>
            <td colSpan={4}>
              Orthopaedic Technology (Prosthetist & Orthotist) - Orthopaedic Technology - No of ITEMS Prepared and
              issued e.g. a pair of crutches, Wheelchair, Prosthesis etc. count as one item
            </td>
            <td>{moh717ReportData.orthopaedic_technology_prepared}</td>
          </tr>
          <tr>
            <td>C.8</td>
            <td colSpan={4}>
              Orthopaedic Technology (Prosthetist & Orthotist) - Orthopaedic Technology - No of ITEMS issued e.g. a pair
              of crutches, Wheelchair, Prosthesis etc. count as one item
            </td>
            <td>{moh717ReportData.orthopaedic_technology_issued}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SpecialServicesComponent;
