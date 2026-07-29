import { Type } from '@openmrs/esm-framework';
export const configSchema = {
  etlBaseUrl: {
    _type: Type.String,
    _default: '',
    _description: 'Base URL of the ETL service every report reads from, e.g. "/etl"',
  },
  /* Declared because the deployment sets it in this section. Nothing reads it
     yet; without it the config validator reports it as an unknown key. */
  subDomainUrl: {
    _type: Type.String,
    _default: '',
    _description: 'Origin this instance is served from',
  },
};

export type Config = {
  etlBaseUrl: string;
  subDomainUrl: string;
};
