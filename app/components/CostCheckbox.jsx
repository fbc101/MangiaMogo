import { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const PriceRangeLabel = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

export default function CostCheckbox({ ranges, onSelectionChange, clear, currentSelection }) {
  const [checked, setChecked] = useState({});

  useEffect(() => {
    if (clear) {
      // Reset the checked state to all false when the clear prop is true
      const initialChecked = {};
      ranges.forEach(range => {
        initialChecked[range.id] = false;
      });
      setChecked(initialChecked);
      if (onSelectionChange) {
        onSelectionChange([]); // Inform the parent about the deselection
      }
    }
  }, [clear, ranges, onSelectionChange]);

  useEffect(() => {
    // Initialize checked state based on currentSelection prop (if provided)
    if (currentSelection && ranges) {
      const initialChecked = {};
      ranges.forEach(range => {
        initialChecked[range.id] = currentSelection.some(selectedRange =>
          JSON.stringify(selectedRange) === JSON.stringify(range.range)
        );
      });
      setChecked(initialChecked);
    } else if (ranges && Object.keys(checked).length === 0) {
      // Initialize all checkboxes to unchecked if no currentSelection
      const initialChecked = {};
      ranges.forEach(range => {
        initialChecked[range.id] = false;
      });
      setChecked(initialChecked);
    }
  }, [ranges, currentSelection]);

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
    const initialChecked = {};
    ranges.forEach(range => {
      initialChecked[range.id] = false;
    });
    setChecked(initialChecked);
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

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
      <div className='flex flex-col items-center '>
        <button className="border p-2 text-sm rounded-lg hover:bg-nav-hover" onClick={handleDeselectAll}>
          deselect all
        </button>
      </div>
    </div>
  );
}