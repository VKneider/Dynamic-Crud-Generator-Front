import useAxios from '../../Hooks/useAxios';
import { FormSelect, FormControl, FormLabel, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import staticCatalog from '../../staticCatalog.json';

function Dialog() {
  const { response, error, doRequest } = useAxios();
  const [catalog, setCatalog] = useState({});
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    async function getCatalog() {
      await doRequest({ url: '/getCatalog', method: 'get' });
      error ? setCatalog(staticCatalog.catalog) : setCatalog(response.data);
    }
    getCatalog();
  }, [response, error]);

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };

  return (
    <Container className='dialog'>
      {catalog && (
        <div>
          <FormSelect
            aria-label='Default select example'
            onChange={handleTableChange}
            value={selectedTable}
          >
            {Object.keys(catalog).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </FormSelect>
        </div>
      )}

      {selectedTable && (
        <div className='dialog__content'>
          <div className='dialog__content__title text-light rounded m-4'>
            {selectedTable}
          </div>
          <div className='dialog__content__table'>
            {Object.keys(catalog[selectedTable]).map((property, index) => (
              <div key={property}>
                <FormLabel className='text-light'>{property}</FormLabel>
                <FormControl type='text' />
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

export default Dialog;
