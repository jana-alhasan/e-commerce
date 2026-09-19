import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  addToCart,
  selectCartItems,
  updateCartData,
} from "../../redux/cartSlice";
import { selectUser } from "../../redux/authSlice";
import Detail from "../../components/common/detail/Detail";
import ImageBox from "../../components/productDetails/imageBox/ImageBox";
import ProductInfo from "../../components/productDetails/productInfo/ProductInfo";
import MyTabs from "../../components/productDetails/tabs/MyTabs";
import ProductCard from "../../components/home/productCard/ProductCard";
import ImageSkeleton from "../../components/skeleton/ImageSkeleton";
import DetailsSkeleton from "../../components/skeleton/DetailsSkeleton";
import ProductCardSkeleton from "../../components/skeleton/ProductCardSkeleton";
import LoginConfirmationDialog from "../../components/common/LoginConfirmationDialog/LoginConfirmationDialog";
import { className } from "./styles";


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const user = useSelector(selectUser);
  const products = useSelector((state) => state.products.products);
  // const cartItems = useSelector(selectCartItems);
  const productLoading = useSelector(
    (state) => state.products.selectProductLoading
  );
  const product = products.find((p) => p.id === parseInt(id));


  const { title, price, category, description, image, rating } = product || {};
  const { rate } = rating || {};
  const productTitle = Array.isArray(title)
    ? title[0] || "not found"
    : title?.toString() || "not found";
  const productprice = Array.isArray(price)
    ? price[0] || "not found"
    : price?.toString() || "not found";
  const productcategory = Array.isArray(category)
    ? category[0] || "not found"
    : category?.toString() || "not found";
  const productDescription = Array.isArray(description)
    ? description[0] || "not found"
    : description?.toString() || "not found";
  const productImage = Array.isArray(image)
    ? image[0] || "not found"
    : image?.toString() || "not found";
  const productrating = Array.isArray(rate)
    ? rate[0] || "not found"
    : rate?.toString() || "not found";
  // console.log("cartItemss", cartItems[0]);



  const data = [
    { vitamins: "Vitamin A", quantity: "1000 IU", percentDV: "20%" },
    { vitamins: "Vitamin B", quantity: "2 mg", percentDV: "40%" },
    { vitamins: "Vitamin C", quantity: "30 mg", percentDV: "60%" },
    { vitamins: "Vitamin D", quantity: "400 IU", percentDV: "80%" },
    { vitamins: "Vitamin E", quantity: "10 IU", percentDV: "20%" },
    { vitamins: "Vitamin K", quantity: "80 mcg", percentDV: "160%" },
    { vitamins: "Vitamin B12", quantity: "6 mcg", percentDV: "120%" },
    { vitamins: "Folate", quantity: "400 mcg", percentDV: "80%" },
  ];

  const detailsArray = [
    {
      label: "SKU",
      value: "76645",
      textColor: "var(--c-1-a, #151515)",
    },
    {
      label: "Category",
      value: productcategory || "No Category",
      textDecoration: "underline",
      textColor: "var(--c-1-a, #151515)",
    },
    {
      label: "Stock",
      value: "In Stock",
      textColor: "var(--c-2-a, #6A983C)",
      textDecoration: "underline",
    },
    {
      label: "Farm",
      value: "Grocery Tarm Fields",
      textColor: "var(--c-1-a, #151515)",
    },
  ];

  const moredetailsArray = [
    {
      label: "Freshness",
      value: "1 days old",
      textColor: "var(--c-1-a, #151515)",
    },
    {
      label: "Buy by",
      value: "pcs, kgs, box, pack",
      textColor: "var(--c-1-a, #151515)",
    },
    {
      label: "Delivery",
      value: "in 2 days",
      textColor: "var(--c-1-a, #151515)",
    },
    {
      label: "Delivery area",
      value: "Czech republic",
      textColor: "var(--c-1-a, #151515)",
    },
  ];

  const handleUpdateCart = async () => {
    const userId = 8;
    const { quantity } = product;
    const date = "2023-12-10";
    try {
      await dispatch(
        updateCartData({ userId: userId, quantity: quantity, date: date })
      );
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  const handleAddToCartClick = async () => {
    if (!user) {
      setLoginDialogOpen(true);
    }
    try {
      await dispatch(addToCart(product));
      handleUpdateCart();
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  const handleClose = () => {
    setLoginDialogOpen(false);
  };

  return (
    <Grid container justifyContent="space-between" spacing={4}>
      <Grid
        item
        md={6}
        xs={12}
        display={{ lg: "block", md: "block", sm: "flex", xs: "flex" }}
        justifyContent={"center"}
      >
        {  !productLoading ? (
          <ImageBox image={productImage} title={productTitle} />
        ) : (
          <ImageSkeleton />
        )}
        <Stack display={{ lg: "block", md: "block", sm: "none", xs: "none" }}>
          { !productLoading ? (
            <>
              <ImageBox image={productImage} title={productTitle} />
              <ImageBox image={productImage} title={productTitle} />
            </>
          ) : (
            <ImageSkeleton />
          )}
        </Stack>
      </Grid>
      <Grid item md={6} display="flex" justifyContent="end">
        <Stack spacing={4} marginRight={{ lg: "9rem", md: "9rem", sm: "0" }}>
          { !productLoading?(
             <ProductInfo
             title={productTitle}
             rate={productrating}
             description={productDescription}
           />
          ):(
            <DetailsSkeleton/>
          )}
         
          <Stack
            flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            justifyContent={"space-between"}
          >
            <Box style={className.detailsBox}>
              {detailsArray.map((detail, index) => (
                <Detail
                  key={index}
                  label={detail.label}
                  value={detail.value}
                  textColor={detail.textColor}
                  textDecoration={detail.textDecoration}
                />
              ))}
            </Box>
            <Box style={className.detailsBox}>
              {moredetailsArray.map((detail, index) => (
                <Detail
                  key={index}
                  label={detail.label}
                  value={detail.value}
                  textColor={detail.textColor}
                  textDecoration={detail.textDecoration}
                />
              ))}
            </Box>
          </Stack>
          <Stack
            flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            alignItems={{
              lg: "center",
              md: "center",
              sm: "start",
              xs: "start",
            }}
            justifyContent={"space-between"}
            gap={"2rem"}
            style={className.priceBox}
          >
            <Typography
              style={className.price}
            >{`${productprice} USD`}</Typography>
            <Box display={"flex"} gap={"2rem"}>
              <Button style={className.quantityBox}>
                1
                <span style={className.tabs}>
                  | pcs
                  <KeyboardArrowDown style={className.icon} />
                </span>
              </Button>
              <Button
                onClick={handleAddToCartClick}
                style={className.addToCart}
              >
                + Add to cart
              </Button>
              <LoginConfirmationDialog open={loginDialogOpen} onClose={handleClose} />
            </Box>
          </Stack>
          <MyTabs />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vitamins</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>% DV</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row, index) => (
                  <TableRow
                    key={index}
                    style={{
                      background:
                        index % 2 === 0
                          ? "var(--c-1-i, #FDFDFD)"
                          : "var(--c-1-j, #FFF)",
                    }}
                  >
                    <TableCell style={className.tableRows}>
                      {row.vitamins}
                    </TableCell>
                    <TableCell style={className.tableRows}>
                      {row.quantity}
                    </TableCell>
                    <TableCell style={className.tableRows}>
                      {row.percentDV}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Grid>
      <Grid item container sm={12} spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h5"> Related products</Typography>
        </Grid>
        {product && productLoading ? (
          <ProductCardSkeleton/>
        ) : (
          products.slice(0, 4).map((product) => (
            <Grid item key={product.id} lg={3} md={4} sm={6} spacing={5}>
              <ProductCard product={product} isGridView={true} />
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
