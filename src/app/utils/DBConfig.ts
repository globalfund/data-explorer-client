import { IndexedDBProps } from "react-indexed-db";

export const DBConfig: IndexedDBProps = {
  name: "the-data-explorer-db",
  version: 1,
  objectStoresMeta: [
    {
      store: "data-themes-raw-data",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [],
    },
  ],
};
