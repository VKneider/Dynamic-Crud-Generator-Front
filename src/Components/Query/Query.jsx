import Styles from './Query.module.css';
import { useState, useRef, useEffect } from 'react';

import { Box, Button, TextField, Alert, AlertTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useQuery from '../../Hooks/useQuery';

export default function Query() {
  const [inputText, setInputText] = useState('');
  const queryRef = useRef();
  const { rows, columns, runQuery, error } = useQuery();

  function handleChange(e) {
    setInputText(e.target.value);
  }

  async function handleClick() {
    await runQuery(queryRef.current.value);
  }

  return (
    <div>
      <div className={Styles.queryContainer}>
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
      </div>

      <Box
        sx={{ height: 800, width: '100%', margin: '0 auto', padding: '2rem' }}
      >
        <DataGrid
          sx={{ backgroundColor: 'white' }}
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
      {error && (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </div>
  );
}
