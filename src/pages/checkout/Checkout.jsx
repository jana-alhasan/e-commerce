import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Typography, Card, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../../utils/validation/checkoutValidation";
import { selectCartItems,selectCartLoading } from "../../redux/cartSlice";
import {
  addToCart,
  removeFromCart,
  clearfromCart,
} from "../../redux/cartSlice";
import AdditionalInfo from "../../components/checkout/addtionalInfo/AdditionalInfo";
import CheckoutForm from "../../components/checkout/checkoutForm/CheckoutForm";
import MyCardContent from "../../components/checkout/myCardContent/MyCardContent";
import MyCardMedia from "../../components/checkout/myCardMedia/MyCardMedia";
import { classname } from "./styles";
import DetailsSkeleton from "../../components/skeleton/DetailsSkeleton";

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartLoading = useSelector(selectCartLoading);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });
  const statesAndCountries = [
    "Palestine",
    "Jordan",
    "Syria",
    "Egypt",
    "Mexico",
    "United Kingdom",
  ];
  
  // ************Functions******************
  const calculateTotal = (cartItems) => {
    if (!cartItems) {
      return 0;
    }
    return cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
  };

 
  const handleIncrement = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrement = (product) => {
    if (product.quantity === 1) {
      setItemToDelete(product);
      setDeleteConfirmationOpen(true);
    } else {
      dispatch(removeFromCart(product.id));
    }
  };

  const handleDeleteConfirmation = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete.id));
      setItemToDelete(null);
      setDeleteConfirmationOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setItemToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteCart=(product)=>{
    setItemToDelete(product);
    setDeleteConfirmationOpen(true);
  }

  const onSubmit = (data) => {
    console.log(data);
  };
  // ************************************************
  const subtotal = Number(calculateTotal(cartItems).toFixed(2));
  const taxPercentage = 17;
  const taxAmount = Number((subtotal * (taxPercentage / 100)).toFixed(2));
  const allTotalPrice = (subtotal + taxAmount).toFixed(2);
  return (
    <Grid container spacing={10}>
      <Grid item md={6} sm={12}>
        <Typography style={classname.title}>Billing info</Typography>
        <Typography style={classname.description}>
          Please enter your Billing info
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={classname.BillingInfo}>
          <CheckoutForm
            control={control}
            errors={errors}
            statesAndCountries={statesAndCountries}
          />
          <AdditionalInfo control={control} errors={errors} />
          <button type="submit" style={classname.submit}>
            Complete Order
          </button>
        </form>
      </Grid>
      <Grid item md={5} sm={12} style={classname.orderSummaryContainer}>
        <Card>
          <Box style={classname.orderSummaryTitle}>
            <Typography style={classname.title}>Order Summary</Typography>
            <Typography style={classname.description}>
              Price can change depending on shipping method and taxes of your
              state.
            </Typography>
          </Box>
          {cartLoading ? (
            <DetailsSkeleton/>
            ) : cartItems?.length > 0 ? (
              cartItems.map((cartItem) => (
            <Box
              key={cartItem.id}
              style={classname.orderSummary}
              display={"flex"}
            >
              <MyCardMedia cartItem={cartItem}/>
              <MyCardContent
                cartItem={cartItem}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleDeleteCart={handleDeleteCart}
                handleDeleteConfirmation={handleDeleteConfirmation}
                handleDeleteCancel={handleDeleteCancel}
                deleteConfirmationOpen={deleteConfirmationOpen}
              ></MyCardContent>
            </Box>
             ))
             ) : (
               <Typography> No items in the cart.</Typography>
             )}

          <Box style={classname.subtotal}>
            <Typography style={classname.subtotalContent}>
              <span> Subtotal: </span>
              <span> {subtotal} USD </span>
            </Typography>
            <Typography style={classname.subtotalContent}>
              <span> Tax </span>
              <span> 17% {taxAmount} USD </span>
            </Typography>
            <Typography style={classname.subtotalContent}>
              <span> Shipping </span>
              <span> 0 USD </span>
            </Typography>
            <Button style={classname.codeButton}>
              <TextField
                style={classname.description}
                placeholder="Apply promo code"
                variant="standard"
                InputProps={{ disableUnderline: true, content: "unset" }}
              ></TextField>
              Apply Now
            </Button>
            <Typography style={classname.subtotalContent}>
              <span> Total Order</span>
              <Typography style={classname.price}> {allTotalPrice}</Typography>
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Checkout;
