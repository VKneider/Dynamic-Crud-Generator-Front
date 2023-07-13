import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useTableData from '../../Hooks/useTableData';
import { useContext } from 'react';
import { TableContext } from '../../Context/TableContext';

export default function DataContainer() {
  const { selectedTable, setSelectedRowData } = useContext(TableContext);
  const { rows, columns } = useTableData(selectedTable);

  function handleRowClick(e) {
    setSelectedRowData(e.row);
  }

  return (
    <Box sx={{ height: 800, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
      />
    </Box>
  );
}
