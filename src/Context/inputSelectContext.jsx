import { createContext, useContext, useEffect, useState } from 'react';
import useForeignKeyData from '../Hooks/useForeignKeyData';
import { TableContext } from './TableContext';
import useCatalog from '../Hooks/useCatalog';

export const InputSelectContext = createContext();

export const InputSelectContextProvider = ({ children }) => {
  const { selectedTable } = useContext(TableContext);
  const { tableInputs } = useCatalog(selectedTable);

  const [inputSelectData, setInputSelectData] = useState({});
  const [actualSelectionData, setActualSelectionData] = useState({});

  function handleSelectionDataChange(e, fieldName) {
    setActualSelectionData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  }
  const { data, fetchData } = useForeignKeyData(tableInputs, selectedTable);

  useEffect(() => {
    if (tableInputs && tableInputs.length > 0 && selectedTable) {
      async function doFetch() {
        await fetchData(tableInputs, selectedTable);
      }
      doFetch();
    }
  }, [tableInputs, selectedTable]);

  useEffect(() => {
    if (data && data.length > 0) {
      setInputSelectData(data);
    }
  }, [data, tableInputs]);

  return (
    <InputSelectContext.Provider
      value={{
        inputSelectData,
        actualSelectionData,
        handleSelectionDataChange,
      }}
    >
      {children}
    </InputSelectContext.Provider>
  );
};
