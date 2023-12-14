import { Card,Box,CardMedia,CardContent,Typography } from "@mui/material";
import QuantityCounter from "../quantityCounter/QuantityCounter";
import { className } from "./styles";



function CartCard({cartItem,handleDecrement,handleIncrement,handleDeleteCart}) {
  return (
    <Card key={cartItem.id} style={className.cardContainer} >        
    <Box display={'flex'} key={cartItem.id} flexDirection={'row'} alignItems="center" spacing={2}>
      <CardMedia
        component="img"
        image={cartItem.image}
        style={className.image}
      />
      <CardContent style={className.cardContent}>
        <Typography variant="h6" style={className.title}>{cartItem.title}</Typography>
         <Box display={'flex'} justifyContent={'space-between'}> 
          <Typography style={className.price}>${cartItem.price * cartItem.quantity}</Typography>
          <QuantityCounter
         quantity={ cartItem.quantity}
         onIncrement={()=>handleIncrement(cartItem)}
         onDecrement={()=>handleDecrement(cartItem)}
         clearCart={()=>handleDeleteCart(cartItem)}
      />
      </Box>
      </CardContent>
    </Box>

</Card>
  )
}

export default CartCard