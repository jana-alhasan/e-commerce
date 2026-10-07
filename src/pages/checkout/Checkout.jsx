import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Typography, Card, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../../utils/validation/checkoutValidation";
import {
  addToCart,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartLoading,
} from "../../redux/cartSlice";
import AdditionalInfo from "../../components/checkout/addtionalInfo/AdditionalInfo";
import CheckoutForm from "../../components/checkout/checkoutForm/CheckoutForm";
import MyCardContent from "../../components/checkout/myCardContent/MyCardContent";
import MyCardMedia from "../../components/checkout/myCardMedia/MyCardMedia";
import { classname } from "./styles";
import DetailsSkeleton from "../../components/skeleton/DetailsSkeleton";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  shipToDifferentAddress: false,
  additionalInformation: "",
  marketingEmails: false,
  termsAndConditions: false,
};

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartLoading = useSelector(selectCartLoading);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [checkoutError, setCheckoutError] = useState("");

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues,
  });

  const statesAndCountries = [
    "Palestine",
    "Jordan",
    "Syria",
    "Egypt",
    "Mexico",
    "United Kingdom",
  ];

  const subtotal = Number(
    cartItems
      .reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      )
      .toFixed(2)
  );
  const taxPercentage = 17;
  const taxAmount = Number((subtotal * (taxPercentage / 100)).toFixed(2));
  const totalPrice = Number((subtotal + taxAmount).toFixed(2));
  const itemCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

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

  const handleDeleteCart = (product) => {
    setItemToDelete(product);
    setDeleteConfirmationOpen(true);
  };

  const onSubmit = (data) => {
    if (cartItems.length === 0) {
      setCheckoutError("Add at least one item before completing the demo order.");
      return;
    }

    setCheckoutError("");
    setCompletedOrder({
      customerName: `${data.firstName} ${data.lastName}`.trim(),
      itemCount,
      totalPrice,
    });
    dispatch(clearCart());
    reset(defaultValues);
  };

  return (
    <>
      {completedOrder && (
        <Box role="status" aria-live="polite" sx={{ mb: 4 }}>
          <Typography variant="h5">Demo order complete</Typography>
          <Typography>
            Thanks, {completedOrder.customerName}. This local simulation recorded
            {` ${completedOrder.itemCount} item(s) totaling $${completedOrder.totalPrice.toFixed(
              2
            )}`}.
          </Typography>
          <Typography>
            No payment was processed and no order was sent to a backend.
          </Typography>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
            Continue shopping
          </Button>
        </Box>
      )}

      <Grid container spacing={10}>
        <Grid item md={6} sm={12}>
          <Typography style={classname.title}>Billing info</Typography>
          <Typography style={classname.description}>
            Enter billing information to complete the local demo checkout.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={classname.BillingInfo}>
            <CheckoutForm
              control={control}
              errors={errors}
              statesAndCountries={statesAndCountries}
            />
            <AdditionalInfo control={control} errors={errors} />
            {checkoutError && (
              <Typography role="alert" color="error" sx={{ mb: 2 }}>
                {checkoutError}
              </Typography>
            )}
            {cartItems.length === 0 && !completedOrder && (
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Your cart is empty. Add an item before completing checkout.
              </Typography>
            )}
            <button
              type="submit"
              style={classname.submit}
              disabled={cartItems.length === 0}
            >
              Complete Demo Order
            </button>
          </form>
        </Grid>

        <Grid item md={5} sm={12} style={classname.orderSummaryContainer}>
          <Card>
            <Box style={classname.orderSummaryTitle}>
              <Typography style={classname.title}>Order Summary</Typography>
              <Typography style={classname.description}>
                This project uses a fixed 17% demo tax calculation and does not
                process real payments.
              </Typography>
            </Box>

            {cartLoading ? (
              <DetailsSkeleton />
            ) : cartItems.length > 0 ? (
              cartItems.map((cartItem) => (
                <Box
                  key={cartItem.id}
                  style={classname.orderSummary}
                  display="flex"
                >
                  <MyCardMedia cartItem={cartItem} />
                  <MyCardContent
                    cartItem={cartItem}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    handleDeleteCart={handleDeleteCart}
                    handleDeleteConfirmation={handleDeleteConfirmation}
                    handleDeleteCancel={handleDeleteCancel}
                    deleteConfirmationOpen={deleteConfirmationOpen}
                  />
                </Box>
              ))
            ) : (
              <Typography sx={{ p: 2 }}>No items in the cart.</Typography>
            )}

            <Box style={classname.subtotal}>
              <Typography style={classname.subtotalContent}>
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} USD</span>
              </Typography>
              <Typography style={classname.subtotalContent}>
                <span>Tax</span>
                <span>17% · {taxAmount.toFixed(2)} USD</span>
              </Typography>
              <Typography style={classname.subtotalContent}>
                <span>Shipping</span>
                <span>0.00 USD</span>
              </Typography>
              <Typography style={classname.subtotalContent}>
                <span>Total Order</span>
                <Typography style={classname.price}>
                  {totalPrice.toFixed(2)} USD
                </Typography>
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Checkout;
