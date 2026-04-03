import { Type } from '@openmrs/esm-framework';
export const configSchema = {
  etlBaseUrl: {
    _type: Type.String,
    _default: '',
    _description: 'ETL endpoint',
  },
};

export type Config = {
  etlBaseUrl: string;
};
