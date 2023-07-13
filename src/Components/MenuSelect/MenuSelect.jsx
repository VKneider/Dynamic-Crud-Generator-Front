import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import useCatalog from '../../Hooks/useCatalog';
import { useContext } from 'react';
import { TableContext } from '../../Context/TableContext';

export default function MenuSelect() {
  const { catalogTables } = useCatalog();
  const { selectedTable, setSelectedTable } = useContext(TableContext);

  function handleTableChange(e) {
    setSelectedTable(e.target.value);
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Tables</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedTable ?? ''}
          label='Tables'
          onChange={handleTableChange}
        >
          {catalogTables.map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
