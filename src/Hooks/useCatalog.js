import { useContext, useState, useEffect } from 'react';
import { CatalogContext } from '../Context/CatalogContext.jsx';

export default function useCatalog(tableName) {
  const { catalog } = useContext(CatalogContext);
  const [catalogTables, setCatalogTables] = useState([]);
  const [tableInputs, setTableInputs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tables = [];
    for (const key in catalog) {
      if (key !== 'log') tables.push(key);
    }

    setCatalogTables(tables);
  }, [catalog, tableName]);

  useEffect(() => {
    if (tableName) {
      if (tableName.length === 0) {
        setTableInputs([]);
      } else {
        setTableInputs(catalog[tableName]);
      }
      setIsLoading(false);
    }
  }, [tableName, catalog]);

  return { tableInputs, catalogTables, isLoading };
}
