import { Box } from "@mui/material";
import { className } from "./styles";

function ImageBox({image,title}) {
  return (
    <Box
    style={className.imageBox}
  >
    <img
      src={image}
      alt={title}
      style={className.image}
    />
  </Box>
  )
}

export default ImageBox;