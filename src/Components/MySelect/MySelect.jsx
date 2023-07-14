import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';

export default function MySelect({ label, iterable, value, setter }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (iterable) {
      setLoading(false);
    }
  }, [iterable]);

  return (
    <div>
      {!loading && (
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={value || ''}
            label={label}
            onChange={setter}
          >
            {iterable.map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
