import { TextField } from '@mui/material';
import useCatalog from '../../Hooks/useCatalog';

export default function MenuInputs({ selectedTable }) {
  const { tableInputs } = useCatalog(selectedTable);
  console.log(tableInputs);

  return (
    <div>
      {tableInputs.map((inputData, idx) => {
        return <TextField key={idx} label={inputData.fieldName} />;
      })}
    </div>
  );
}
