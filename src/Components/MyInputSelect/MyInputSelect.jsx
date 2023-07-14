import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';

export default function MyInputSelect({ label, iterable, value, setter }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (iterable && iterable[label]) {
      setLoading(false);
    }
    return () => {
      setLoading(true);
    };
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
            onChange={(e) => setter(e, label)}
          >
            {iterable &&
              iterable[label] &&
              iterable[label].map((key) => (
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
