import { useEffect, useState } from 'react';
import useCatalog from './useCatalog';

export default function useTableData(selectedTable) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const { tableInputs, isLoading } = useCatalog(selectedTable);

  useEffect(() => {
    if (!isLoading) {
      const getRows = async () => {
        try {
          const url = `http://localhost:3003/tableRows?tableName=${selectedTable}`;
          const response = await fetch(url, { method: 'GET' });
          const data = await response.json();

          data.tableRows.map((row, index) => {
            row.id = index;
            return row;
          });

          setRows(data.tableRows);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      getRows();
      const updatedColumns = tableInputs.map((input) => {
        return {
          field: input.fieldName,
          headerName: input.fieldName,
          editable: false,
          width: 150,
        };
      });

      setColumns(updatedColumns);
    }
  }, [selectedTable, tableInputs, isLoading]);

  return { rows, columns };
}
