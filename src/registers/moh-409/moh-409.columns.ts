import { type RegisterColumn } from '../../common/report-register';

/**
 * MOH-409 columns in the order they appear on the register.
 */
export const moh409ExportColumns: RegisterColumn[] = [
  { header: 'SNO', value: (_row, index) => index + 1 },
  { header: 'Date', value: (row) => row.date ?? '' },
  { header: 'Client Unique Number', value: (row) => row.cr_id ?? '', text: true },
  { header: 'Client Name', value: (row) => row.client_name ?? '' },
  { header: 'Serostatus (P/N/HEI/U)', value: (row) => row.serostatus ?? '' },
  { header: 'Therapeutic diet milk (F-100), 75kcal/10g - 400g tin', value: (row) => row.f100 ?? '' },
  { header: 'Therapeutic diet milk (F-75), 100kcal/10g - 400g tin', value: (row) => row.f75 ?? '' },
  { header: 'RUTF paste, 500kcal/92g (e.g. Plumpy Nut) - 1 sachet of 92g', value: (row) => row.rutf ?? '' },
  { header: 'RUSF paste, 500kcal/92g (e.g. Plumpy Soy) - 1 sachet of 92g', value: (row) => row.rusf ?? '' },
  { header: 'Corn Soy Blend flour, 390kcal/100g - 300g sachets', value: (row) => row.corn_soy_blend_300g ?? '' },
  { header: 'Corn Soy Blend flour, 390kcal/100g - 1.5kg packet', value: (row) => row.corn_soy_blend_1_5kg ?? '' },
  {
    header: 'Fortified blended food, 514kcal/100g - children aged 6 months-9 years (bag of 15 sachets of 200g)',
    value: (row) => row.fortified_blended_food_children ?? '',
  },
  {
    header: 'Fortified blended food - adults and adolescents (10-17 years) (bag of 15 sachets of 300g)',
    value: (row) => row.fortified_blended_food_adults ?? '',
  },
  {
    header: 'Fortified blended food - pregnant women and post-partum mothers, 450kcal/100g (bag of 15 sachets of 200g)',
    value: (row) => row.fortified_blended_food_pregnant ?? '',
  },
  { header: 'Micronutrient Powder - 1 sachet of 1g', value: (row) => row.micronutrient_powder ?? '' },
  { header: 'Others', value: (row) => row.others ?? '' },
];
