
import { Checkbox, FormControl, FormControlLabel ,Box, Typography} from '@mui/material';
import { className } from './styles';

const checkboxes = Array.from({ length: 5 }, (_, index) => ({
  label: `Brand ${index + 1}`,
}));

function Brands() {
  return (
    <Box>
    <Typography variant="h6" style={className.filterTitle}>Brands</Typography>
    <FormControl style={className.formControl} component="fieldset" variant="standard" >
      {checkboxes.map((checkbox, index) => (
        <FormControlLabel
          key={index}
          control={ <Checkbox
            sx={{
              color: '#D1D1D1',
              '&.Mui-checked': {
                color: '#6A983C',
              },
            }}
       />}
          label={checkbox.label}
        />
      ))}
    </FormControl>
    </Box>
  )
}

export default Brands