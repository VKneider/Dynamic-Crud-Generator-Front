import { TextField } from '@mui/material';
import useCatalog from '../../Hooks/useCatalog';
import { useState } from 'react';
import Input from '../Input/Input';

export default function MenuInputs({ rowData, selectedTable }) {
  const { tableInputs } = useCatalog(selectedTable);
  return (
    <div>
      {tableInputs.map((inputData, idx) => {
        return (
          <Input
            key={idx}
            inputData={inputData}
            initialValue={rowData[inputData.fieldName]}
          />
        );
      })}
    </div>
  );
}
