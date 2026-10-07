import { IconButton, Divider, Typography, Box } from "@mui/material";
import { Add, Remove, DeleteOutline } from "@mui/icons-material";
import { className } from "./styles";

const QuantityCounter = ({
  quantity,
  onIncrement,
  onDecrement,
  clearCart,
  customStyle,
}) => {
  return (
    <Box style={className.iconContainer}>
      <Box style={className.quantity}>
        <IconButton onClick={onDecrement} aria-label="Decrease quantity">
          <Remove style={className.icon} />
        </IconButton>
        <Divider orientation="vertical" flexItem />
        <Typography
          variant="body1"
          style={customStyle ? customStyle : className.number}
          aria-label={`Quantity ${quantity}`}
        >
          {quantity}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <IconButton onClick={onIncrement} aria-label="Increase quantity">
          <Add style={customStyle ? customStyle : className.icon} />
        </IconButton>
      </Box>
      <IconButton onClick={clearCart} aria-label="Remove item from cart">
        <DeleteOutline />
      </IconButton>
    </Box>
  );
};

export default QuantityCounter;
