import { createContext, useEffect, useState } from 'react';
import useFetch from '../Hooks/useFetch';

export const CatalogContext = createContext();

//  eslint-disable-next-line
export const CatalogProvider = ({ children }) => {
  const [catalog, setCatalog] = useState({});
  const { loading, data, error, fetchData } = useFetch(
    'http://localhost:3003/catalog',
  );

  useEffect(() => {
    fetchData('GET');
  }, []);

  useEffect(() => {
    if (data) {
      setCatalog(data.catalog);
    }
  }, [data]);

  return (
    <CatalogContext.Provider value={{ catalog, loading }}>
      {children}
    </CatalogContext.Provider>
  );
};
