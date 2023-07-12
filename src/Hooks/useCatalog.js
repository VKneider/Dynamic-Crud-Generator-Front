import { useContext } from 'react';
import { CatalogContext } from '../Context/CatalogContext.jsx';
import { jsx } from '@emotion/react';

export default function useCatalog(tableName) {
  const { catalog } = useContext(CatalogContext);

  const catalogTables = [];

  for (const key in catalog) {
    if (key !== 'log') catalogTables.push(key);
  }

  if (tableName) {
    const tableInputs = catalog[tableName];
    return { tableInputs, catalogTables };
  } else {
    return { catalogTables };
  }
}
