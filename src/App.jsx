import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { useContext, useState } from 'react';
import Crud from './Components/Crud/Crud';
import { CatalogContext } from './Context/CatalogContext';
import Loading from './Components/Loading/Loading';
import useCatalog from './Hooks/useCatalog';

function App() {
  // eslint-disable-next-line
  const [actualPage, setActualPage] = useState('Crud');
  const { loading } = useContext(CatalogContext);

  return (
    <>
      <Navbar setActualPage={setActualPage} />
      <Crud />
    </>
  );
}

export default App;
