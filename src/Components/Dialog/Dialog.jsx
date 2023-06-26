import useAxios from "../../Hooks/useAxios";
import { FormSelect, FormControl, FormLabel } from "react-bootstrap";
import { useEffect, useState } from "react";

function Dialog() {
  const { response, refetch } = useAxios({
    url: "/getCatalog",
    method: "GET"
  });

  const [catalog, setCatalog] = useState({});
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    if (response) {
      setCatalog(response.catalog);
    }
  }, [response]);

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };

  return (
    <>
      <div className="dialog">
        {catalog && (
          <div>
            <FormSelect
              aria-label="Default select example"
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
          <div className="dialog__content">
            <div className="dialog__content__title">{selectedTable}</div>
            <div className="dialog__content__table">
              {Object.keys(catalog[selectedTable]).map((property) => (
                <div key={property}>
                  <FormLabel>{property}</FormLabel>
                  <FormControl type="text" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dialog;
