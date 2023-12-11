import { Box,FormControlLabel,Radio } from "@mui/material"
import { className } from "./styles"

function Sort({sortBy,handleSortChange}) {
  return (
    <Box style={className.sortContainer}>
    <FormControlLabel
      control={
        <Radio
          checked={sortBy === "desc"}
          onChange={handleSortChange}
          value="desc"
        
        />
      }
      label="Sort Descending"
      style={className.order}
    />
    <FormControlLabel
      control={
        <Radio
          checked={sortBy === "asc"}
          onChange={handleSortChange}
          value="asc"
      
        />
      }
      label="Sort Ascending"
      style={className.order}
    />
  </Box>
  )
}

export default Sort