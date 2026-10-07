import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { addToCart } from "../../redux/cartSlice";
import { selectUser } from "../../redux/authSlice";
import {
  fetchAllProducts,
  selectProductLoading,
} from "../../redux/productSlice";
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

const displayValue = (value) =>
  value === null || value === undefined || value === "" ? "Not provided" : value;

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [lookupStatus, setLookupStatus] = useState("idle");
  const user = useSelector(selectUser);
  const products = useSelector((state) => state.products.products) || [];
  const productLoading = useSelector(selectProductLoading);
  const product = products.find((item) => item.id === Number(id));

  useEffect(() => {
    if (product || lookupStatus !== "idle") {
      return;
    }

    setLookupStatus("loading");
    dispatch(
      fetchAllProducts({
        currentPage: 1,
        productsPerPage: 20,
        sortBy: "asc",
      })
    )
      .unwrap()
      .then(() => setLookupStatus("done"))
      .catch(() => setLookupStatus("error"));
  }, [dispatch, lookupStatus, product]);

  if (
    !product &&
    (lookupStatus === "idle" || lookupStatus === "loading" || productLoading)
  ) {
    return (
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <ImageSkeleton />
        </Grid>
        <Grid item md={6} xs={12}>
          <DetailsSkeleton />
        </Grid>
      </Grid>
    );
  }

  if (!product) {
    return (
      <Box py={8} textAlign="center" role="status">
        <Typography variant="h5" gutterBottom>
          Product not found
        </Typography>
        <Typography>
          We could not load this product. Please return to the catalog and try
          again.
        </Typography>
      </Box>
    );
  }

  const {
    title,
    price,
    category,
    description,
    image,
    images = [],
    rating = {},
    brand,
    sku,
    stock,
    availabilityStatus,
    shippingInformation,
    returnPolicy,
    warrantyInformation,
    reviews = [],
  } = product;

  const galleryImages = [image, ...images.filter((item) => item !== image)]
    .filter(Boolean)
    .slice(0, 3);

  const detailsArray = [
    { label: "SKU", value: displayValue(sku) },
    { label: "Category", value: displayValue(category) },
    { label: "Brand", value: displayValue(brand) },
    {
      label: "Stock",
      value: stock === null || stock === undefined ? "Not provided" : `${stock} items`,
      textColor: "var(--c-2-a, #6A983C)",
    },
  ];

  const moreDetailsArray = [
    { label: "Availability", value: displayValue(availabilityStatus) },
    { label: "Shipping", value: displayValue(shippingInformation) },
    { label: "Returns", value: displayValue(returnPolicy) },
    { label: "Warranty", value: displayValue(warrantyInformation) },
  ];

  const relatedProducts = [
    ...products.filter(
      (item) => item.id !== product.id && item.category === product.category
    ),
    ...products.filter(
      (item) => item.id !== product.id && item.category !== product.category
    ),
  ].slice(0, 4);

  const handleAddToCartClick = () => {
    if (!user?.token) {
      setLoginDialogOpen(true);
      return;
    }

    dispatch(addToCart(product));
  };

  return (
    <Grid container justifyContent="space-between" spacing={4}>
      <Grid item md={6} xs={12}>
        <Stack spacing={2} alignItems="center">
          {galleryImages.map((galleryImage, index) => (
            <ImageBox
              key={`${galleryImage}-${index}`}
              image={galleryImage}
              title={`${title}${galleryImages.length > 1 ? ` view ${index + 1}` : ""}`}
            />
          ))}
        </Stack>
      </Grid>

      <Grid item md={6} xs={12} display="flex" justifyContent="end">
        <Stack spacing={4} width="100%" marginRight={{ lg: "9rem", md: "3rem", sm: "0" }}>
          <ProductInfo
            title={title}
            rate={rating.rate}
            reviewCount={rating.count}
            description={description}
          />

          <Stack
            flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            justifyContent="space-between"
            gap={2}
          >
            <Box style={className.detailsBox}>
              {detailsArray.map((detail) => (
                <Detail
                  key={detail.label}
                  label={detail.label}
                  value={detail.value}
                  textColor={detail.textColor}
                />
              ))}
            </Box>
            <Box style={className.detailsBox}>
              {moreDetailsArray.map((detail) => (
                <Detail
                  key={detail.label}
                  label={detail.label}
                  value={detail.value}
                />
              ))}
            </Box>
          </Stack>

          <Stack
            flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            alignItems={{ lg: "center", md: "center", sm: "start", xs: "start" }}
            justifyContent="space-between"
            gap="2rem"
            style={className.priceBox}
          >
            <Typography style={className.price}>{`${price} USD`}</Typography>
            <Button onClick={handleAddToCartClick} style={className.addToCart}>
              + Add to cart
            </Button>
            <LoginConfirmationDialog
              open={loginDialogOpen}
              onClose={() => setLoginDialogOpen(false)}
            />
          </Stack>

          <MyTabs description={description} reviews={reviews} />
        </Stack>
      </Grid>

      <Grid item container sm={12} spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h5">Related products</Typography>
        </Grid>
        {productLoading ? (
          <ProductCardSkeleton />
        ) : (
          relatedProducts.map((relatedProduct) => (
            <Grid item key={relatedProduct.id} lg={3} md={4} sm={6} xs={12}>
              <ProductCard product={relatedProduct} isGridView />
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
