import { useContext } from 'react';
import { CatalogContext } from '../Context/CatalogContext.jsx';

export default function useCatalog(tableName) {
  const { catalog } = useContext(CatalogContext);

  const catalogTables = [];

  for (const key in catalog) {
    catalogTables.push(key);
  }
  console.log(catalogTables);

  if (tableName) {
    const tableInputs = catalog[tableName];
    console.log(tableInputs);
    return { tableInputs, catalogTables };
  } else {
    return { catalogTables };
  }
}
