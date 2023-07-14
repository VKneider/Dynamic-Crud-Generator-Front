import { TextField } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { TableContext } from '../../Context/TableContext';

export default function Input({ inputData, initialValue }) {
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(false);

  const { selectedRowData } = useContext(TableContext);

  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {
    if (inputData.is_serial) {
      setDisabled(true);
    } else if (
      inputData.constraint_type === 'ambas' ||
      inputData.constraint_type === 'PRIMARY KEY'
    ) {
      if (isObjectEmpty(selectedRowData)) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }

    return () => {
      setDisabled(false);
    };
  }, [selectedRowData]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <TextField
      label={inputData.fieldName}
      value={value === false ? `${value}` : value || ''}
      onChange={(e) => setValue(e.target.value)}
      autoComplete='off'
      disabled={disabled}
    />
  );
}
