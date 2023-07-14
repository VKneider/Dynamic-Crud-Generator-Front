import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { useContext, useState } from 'react';
import Crud from './Components/Crud/Crud';
import useCatalog from './Hooks/useCatalog';
import Query from './Components/Query/Query';
import { CatalogContext } from './Context/CatalogContext';

function App() {
  // eslint-disable-next-line
  const [actualPage, setActualPage] = useState('Crud');

  return (
    <>
      <Navbar setActualPage={setActualPage} />

      {actualPage === 'Crud' ? (
        <Crud />
      ) : actualPage === 'Query' ? (
        <Query />
      ) : (
        <div>logs</div>
      )}
    </>
  );
}

export default App;
