import React, { useState, useRef, useEffect } from 'react';
import { DataGridTable } from '../DataGridTable/DataGridTable';
import { Button, TextField } from '@mui/material';
import useCatalog from '../../Hooks/useCatalog';

export default function Query() {
  const [query, setQuery] = useState('');
  const { catalogTables } = useCatalog();
  const [inputText, setInputText] = useState('');

  const queryRef = useRef();

  function handleChange(e) {
    setInputText(e.target.value);
  }

  function handleClick() {
    setQuery(queryRef.current.value);
    console.log(queryRef.current.value);
  }

  return (
    <div>
      <TextField
        inputRef={queryRef}
        label='Query'
        value={inputText}
        onChange={handleChange}
      />
      <Button variant='outlined' onClick={handleClick}>
        {' '}
        Run Query{' '}
      </Button>
      <DataGridTable
        rowsData={[]}
        columnsData={[]}
        selectedTable={catalogTables[0]}
        handleRowClick={() => {}}
      />
    </div>
  );
}
