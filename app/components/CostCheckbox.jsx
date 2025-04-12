import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const PriceRangeLabel = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

function CostCheckbox({ ranges, onSelectionChange }) {
  const [checked, setChecked] = React.useState({});

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

  return (
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
  );
}

export default CostCheckbox;