import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function CostSlider({ range, onChange }) {
  const [value, setValue] = React.useState(range);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className='flex flex-col w-full px-4 py-2'>
        <div className="text-sm mb-2">Budget Range</div>    
        <Box sx={{ width: '100%', height: 20 }}>
            <Slider
                getAriaLabel={() => 'Cost range'}
                size="small"
                max={100}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                sx={{
                    width: '100%',
                    height: 8,
                    color: '#4F378A',
                }}
            />
        </Box>
        <div className='text-xs text-gray-600 text-center mt-2'>Between ${range[0]} and ${range[1]}</div>
    </div>
  );
}
