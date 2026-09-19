import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Box, Button } from "@mui/material";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { selectCartItems, selectCartLoading } from "../../redux/cartSlice";
import DeleteConfirmationDialog from "../../components/common/deleteConfirmationDialog/DeleteConfirmationDialog";
import CartCard from "../../components/cart/cartCard/CartCard";
import { className } from "./styles";
import ProductCardSkeleton from "../../components/skeleton/ProductCardSkeleton";
import DetailsSkeleton from "../../components/skeleton/DetailsSkeleton";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartLoading = useSelector(selectCartLoading);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
  const calculateTotal = (cartItems) => {
    if (!cartItems) {
      return 0;
    }
    return cartItems
      .reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      )
      .toFixed(2);
  };
  console.log("fromcartpage", cartItems);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        {cartLoading ? (
          <ProductCardSkeleton />
        ) : cartItems?.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartCard
              key={cartItem.id}
              cartItem={cartItem}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleDeleteCart={handleDeleteCart}
            />
          ))
        ) : (
          <Typography>No items in the cart.</Typography>
        )}

        <DeleteConfirmationDialog
          open={deleteConfirmationOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirmation}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Box style={className.checkout}>
          <Typography variant="h4">Order Summary</Typography>
          <Typography style={className.totalPrice}>
            ${calculateTotal(cartItems)}
          </Typography>
          <Link to={"/checkout"}>
            <Button style={className.checkoutButton}>
              Checkout Now ({cartItems.length} items)
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Cart;
