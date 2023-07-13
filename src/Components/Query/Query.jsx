import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import useCatalog from '../../Hooks/useCatalog';
import { DataGrid } from '@mui/x-data-grid';
import useQuery from '../../Hooks/useQuery';

export default function Query() {
  const [query, setQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const queryRef = useRef();
  const { rows, columns, runQuery } = useQuery();

  function handleChange(e) {
    setInputText(e.target.value);
  }

  async function handleClick() {
    await runQuery(queryRef.current.value);
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

      <Box sx={{ height: 800, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
        />
      </Box>
    </div>
  );
}
