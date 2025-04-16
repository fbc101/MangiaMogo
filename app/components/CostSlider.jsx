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
    <div className='flex flex-col items-center justify-center '>
        <div>Budget Range</div>    
        <Box sx={{ width: 300, height:20 }}>
            <Slider
                getAriaLabel={() => 'Cost range'}
                size="medium"
                max={100}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                sx={{
                    width: 300,
                    height: 12,
                    color: '#4F378A',
                }}
            />
        </Box>
        <div className='flex flex-col items-center justify-center mt-4 text-md' > Between ${range[0]} and ${range[1]}</div>
        
    </div>
  );
}
