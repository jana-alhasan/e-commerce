import { Typography } from "@mui/material";
import  {className}  from "./styles";


function Number({count}) {
  return (
    <Typography style={className.viewButton}><span style={className.itemsCount}>{count}</span> products</Typography>
  )
}

export default Number;