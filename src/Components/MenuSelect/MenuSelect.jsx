import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import useCatalog from '../../Hooks/useCatalog';

export default function MenuSelect({ selectedTable, setSelectedTable }) {
  const { catalogTables } = useCatalog();

  function handleTableChange(e) {
    setSelectedTable(e.target.value);
  }

  const defaultValue = catalogTables[0];
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Tables</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedTable}
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
