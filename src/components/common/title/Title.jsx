import { Typography } from "@mui/material";
import { className } from "./styles";


export default function Title({content}) {
  return (
    <Typography style={className.title}>{content}</Typography>
  )
}
