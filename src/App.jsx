import './App.css';
import { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Crud from './Components/Crud/Crud';
import Query from './Components/Query/Query';

function App() {
  const [actualPage, setActualPage] = useState('Crud');

  return (
    <>
      <Navbar setActualPage={setActualPage} />

      {actualPage === 'Crud' ? (
        <Crud />
      ) : actualPage === 'Query' ? (
        <Query />
      ) : (
        <div>Logs</div>
      )}
    </>
  );
}

export default App;
