import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect } from 'react';
import { TableContext } from '../../Context/TableContext';
import useQuery from '../../Hooks/useQuery';
import { InputSelectContext } from '../../Context/inputSelectContext';

export default function DataContainer({ state }) {
  const { selectedTable, setSelectedRowData } = useContext(TableContext);
  const { rows, columns, runQuery } = useQuery();
  const { setActualSelectionData } = useContext(InputSelectContext);

  useEffect(() => {
    async function fetchData() {
      await runQuery(`SELECT * FROM ${selectedTable}`);
    }
    if (selectedTable) fetchData();
  }, [selectedTable, state]);

  function handleRowClick(e) {
    setSelectedRowData(e.row);
    setActualSelectionData(e.row);
  }

  return (
    <div style={{ height: '75vh' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 12,
            },
          },
        }}
      />
    </div>
  );
}
