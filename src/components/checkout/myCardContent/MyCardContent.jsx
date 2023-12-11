import { CardContent,Typography,Box } from "@mui/material";
import Rating from "../../common/rating/Rating";
import QuantityCounter from "../../cart/quantityCounter/QuantityCounter";
import DeleteConfirmationDialog from "../../common/deleteConfirmationDialog/DeleteConfirmationDialog";
import { classname } from "./styles";

function MyCardContent({cartItem,handleDecrement,handleIncrement,handleDeleteCart,handleDeleteConfirmation,handleDeleteCancel,deleteConfirmationOpen}) {
  return (
    <CardContent style={classname.descriptionContainer}>
    <Typography style={classname.label}>
      {cartItem.title}
    </Typography>
    <Typography style={classname.description}>
      Category:
      <span style={classname.detailDescription}>
        {" "}
        {cartItem.category}{" "}
      </span>
    </Typography>
    <Typography style={classname.description}>
      freshness:
      <span style={classname.detailDescription}> 1 Year Ago </span>
    </Typography>
    <Rating
      rate={cartItem.rating.rate}
      customstyle={{ fontSize: "14px", color: "#FDBC15" }}
    />
    <Box style={classname.quantity}>
      <Typography style={classname.price}>
        ${cartItem.price * cartItem.quantity}
      </Typography>
      <QuantityCounter
        quantity={cartItem.quantity}
        onIncrement={() => handleIncrement(cartItem)}
        onDecrement={() => handleDecrement(cartItem)}
        clearCart={() => handleDeleteCart(cartItem)}
        customStyle={{ fontSize: "12px", margin: "0 2px" }}
      />
         <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirmation}
      />
    </Box>
  </CardContent>
  )
}

export default MyCardContent