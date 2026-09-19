import { Typography } from "@mui/material";
import { className } from "./styles";

function Detail({  label, value, textColor, textDecoration }) {
  const itemDescription = {
    color: textColor || "var(--c-1-c, #A9A9A9)", 
    textDecoration: textDecoration || "none", 
    marginLeft:'2rem',
  };
  return (
    <Typography style={className.item}>
      {label}: <span style={itemDescription}>{value}</span>
    </Typography>

  );
}

export default Detail;
