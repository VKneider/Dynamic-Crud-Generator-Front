import { createContext, useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios';
import staticCatalog from '../staticCatalog.json';

export const CatalogContext = createContext();

//  eslint-disable-next-line
export const CatalogProvider = ({ children }) => {
  const { response, loading, error, doRequest } = useAxios();
  const [catalog, setCatalog] = useState(staticCatalog.catalog);

  /*
  useEffect(() => {
    async function getCatalog() {
      await doRequest({ url: '/catalog', method: 'get' });
    }
    getCatalog();
  }, []);

  useEffect(() => {
    if(error){
      console.log("setError")
      return setCatalog(staticCatalog.catalog);
    }

    if (response) {
      console.log("setResponse")
      return setCatalog(response.catalog);
    }

  }, [loading]);
*/
  return (
    <CatalogContext.Provider value={{ catalog, loading }}>
      {console.log(`CatalogContext.jsx: ${JSON.stringify(catalog)}`)}
      {children}
    </CatalogContext.Provider>
  );
};
