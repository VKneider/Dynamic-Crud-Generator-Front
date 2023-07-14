import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Input({ inputData, initialValue, disabled }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <TextField
      label={inputData.fieldName}
      value={`${value}` || ''}
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
    />
  );
}
