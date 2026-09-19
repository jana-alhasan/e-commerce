import { Box,Typography } from "@mui/material";
import {Pagination }from "@mui/material";
import { className } from "./styles";

function Paginations({count,page,onChange}) {
  return ( 
     <Box style={className.pagination}>
      <Typography color={"grayText"}>Page:</Typography> 
      <Pagination count={count} page={page} onChange={onChange} />
     </Box>
  )
}

export default Paginations;