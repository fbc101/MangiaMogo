import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const PriceRangeLabel = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

export default function CostCheckbox({ ranges, onSelectionChange }) {
  const [checked, setChecked] = useState({});

  const handleChange = (event) => {
    const { name, checked: isChecked } = event.target;

    const updatedChecked = {
      ...checked,
      [name]: isChecked,
    };

    setChecked(updatedChecked);
    
    const selectedRanges = ranges
      .filter(range => updatedChecked[range.id])
      .map(range => range.range);

    if (onSelectionChange) {
      onSelectionChange(selectedRanges);
    }
  };

  const handleDeselectAll = () => {
    const deselected = ranges.map(range => {
      return {[range.id] : false}
    });
    setChecked(deselected);
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  }

  return (
    <div className='flex flex-col bg-nav p-4 rounded-xl'>
      <div>
        Budget Range
      </div>
      <FormGroup>
        {ranges && ranges.map((range) => (
          <FormControlLabel
            key={range.id}
            control={
              <Checkbox
                checked={checked[range.id] || false}
                onChange={handleChange}
                name={range.id}
              />
            }
            label={
              <>
                <Typography>{range.label}</Typography>
              </>
            }
          />
        ))}
      </FormGroup>
      <div className='flex flex-col items-center'>
        <button className="border p-2 text-sm rounded-lg mt-1" onClick={handleDeselectAll}>
          deselect all
        </button>
      </div>
    </div>
  );
}