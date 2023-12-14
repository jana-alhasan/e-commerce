import {Box, CardMedia, IconButton } from "@mui/material";
import { FavoriteBorderOutlined,CompareOutlined,CloseOutlined } from "@material-ui/icons";
import {classname} from './styles'


function MyCardMedia({cartItem}) {
  return (
    <Box style={classname.cardmedia}>
    <CardMedia
    component="img"
    image={cartItem.image}
    style={classname.media}
    alt={`Product`}
  />
  <IconButton style={classname.description}>
    <FavoriteBorderOutlined style={classname.icon} />
    Wishlist
  </IconButton>
  <IconButton style={classname.description}>
    <CompareOutlined style={classname.icon} />
    Compare
  </IconButton>
  <IconButton style={classname.description}>
    <CloseOutlined style={classname.Removeicon} />
    Remove
  </IconButton>
</Box>
  )
}

export default MyCardMedia