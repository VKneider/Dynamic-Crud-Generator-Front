import { createContext, useEffect, useState } from 'react';
import useCatalog from '../Hooks/useCatalog';

export const TableContext = createContext();

export const TableContextProvider = ({ children }) => {
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedRowData, setSelectedRowData] = useState({});
  const { catalogTables } = useCatalog();

  useEffect(() => {
    setSelectedTable(catalogTables[0]);
  }, [catalogTables]);

  return (
    <TableContext.Provider
      value={{
        selectedTable,
        setSelectedTable,
        selectedRowData,
        setSelectedRowData,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
