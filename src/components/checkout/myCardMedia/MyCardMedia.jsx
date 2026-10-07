import { Box, CardMedia } from "@mui/material";
import { classname } from "./styles";

function MyCardMedia({ cartItem }) {
  return (
    <Box style={classname.cardmedia}>
      <CardMedia
        component="img"
        image={cartItem.image}
        style={classname.media}
        alt={cartItem.title || "Cart product"}
      />
    </Box>
  );
}

export default MyCardMedia;
