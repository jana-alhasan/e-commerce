import { Typography } from "@mui/material";
import { className } from "./styles";

function Description({description}) {
  return (
    <Typography style={className.description}>
    {description}
    </Typography>
  )
}

export default Description