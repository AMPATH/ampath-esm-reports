# AMPATH ESM Reports


## Running this code

```sh
yarn  # to install dependencies
yarn start  # to run the dev server
```

`yarn dev` uses the remote o3-config only. To point reports at a local ETL server, run `yarn dev:local-config`, which loads [`local-config.json`](./local-config.json) and overrides `@ampath/esm-reporting.etlBaseUrl` (default `http://localhost:8002`).
