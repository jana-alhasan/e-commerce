import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Hidden,
} from "@mui/material";
import { KeyboardArrowRight, ShoppingCartOutlined } from "@mui/icons-material";
import Detail from "../../common/detail/Detail";
import Rating from "../../common/rating/Rating";
import Title from "../../common/title/Title";
import Description from "./Description";
import {
  addToCart,
  updateCartData,
} from "../../../redux/cartSlice";
import {  selectUser } from "../../../redux/authSlice";
import { className } from "./styles";
import LoginConfirmationDialog from "../../common/LoginConfirmationDialog/LoginConfirmationDialog";

const ProductCard = ({ product, isGridView }) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUser);

  const {id, title, price, category, description, image, rating } = product || {};
  const { rate ,count} = rating || {};
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
  const productcount = Array.isArray(count)
    ? count[0] || "0"
    : count?.toString() || "0";

  
  const handleAddToCartClick = async () => {
    if (!user) {
      setLoginDialogOpen(true);
    }
    else{
    dispatch(addToCart(product));
    const userId = 8;
    const { quantity } = product;
    const date = "2023-12-10";

    try {
      await dispatch(updateCartData({ userId, productId: id, quantity, date }));
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  }
  };
  const handleProductDetailClick = () => {
    navigate(`/product/${id}`);
  };

  const handleClose = () => {
    setLoginDialogOpen(false);
  };


  const detailsArray = [
    {
      label: "Freshness",
      value: "New (Extra fresh)",
      textColor: "var(--c-2-a, #6A983C)",
    },
    { label: "Farm", value: productcategory  },
    { label: "Delivery", value: "Europe" },
    {
      label: "Stock",
      value: `${productcount || 0} pcs`,
      textColor: "var(--c-2-a, #6A983C)",
    },
  ];

  return (
    <Card style={className.cardContainer}>
      <Stack flexDirection={isGridView ? "column" : "row"}>
        <Box
          className="imageContainer"
          display={"flex"}
          height={"280px"}
          width={"100%"}
          maxWidth={isGridView ? "100%" : { sm: "200px", lg: "200px" }}
          justifyContent={isGridView ? "center" : "start"}
        >
          <CardMedia
            component="img"
            image={productImage}
            style={className.media}
            alt={`Product ${id}`}
            onClick={() => handleProductDetailClick()}
          ></CardMedia>
        </Box>
        <CardContent>
          <Stack
            style={className.cardContent}
            flexDirection={
              isGridView
                ? "column"
                : { lg: "row", md: "row", sm: "row", xs: "column" }
            }
            gap={
              isGridView
                ? "1rem"
                : { lg: "5rem", md: "5rem", sm: "1rem", xs: "1rem" }
            }
            width={
              isGridView
                ? "100%"
                : { xs: "min-content", sm: "unset", md: "unset", lg: "unset" }
            }
          >
            <Box style={className.cardItem}>
              <Title content={productTitle} />
              <Description description={productDescription} />
              <Hidden smDown>
                <Rating rate={productrating} />
                {!isGridView
                  ? detailsArray.map((detail, index) => (
                      <Detail
                        key={index}
                        label={detail.label}
                        value={detail.value}
                        textColor={detail.textColor}
                        textDecoration={detail.textDecoration}
                      />
                    ))
                  : ""}
              </Hidden>
            </Box>
            <Box
              style={className.cardItemGrid}
              flexDirection={isGridView ? "row" : "column"}
              alignItems={isGridView ? "center" : "start"}
              gap={"1rem"}
              justifyContent={"space-between"}
            >
              <Title content={`${productprice} USD`} />
              {isGridView ? (
                <>
                  <Button
                    style={className.buyNow}
                    onClick={handleAddToCartClick}
                  >
                    Add To Cart
                  </Button>
              <LoginConfirmationDialog open={loginDialogOpen} onClose={handleClose} />
                </>
              ) : (
                ""
              )}
              {!isGridView ? (
                <>
                  <Hidden smDown>
                    <Typography style={className.description}>
                      <span style={{ textDecoration: "line-through" }}>
                        48.65{" "}
                      </span>
                    </Typography>

                    <Typography style={className.description}>
                      <span style={{ fontWeight: "800" }}>Free Shipping</span>
                    </Typography>
                    <Typography style={className.description}>
                      Delivery in 1 day
                    </Typography>
                  </Hidden>
                  <Button
                    style={className.detailButton}
                    onClick={() => handleProductDetailClick()}
                  >
                    Product Detail
                    <KeyboardArrowRight />
                  </Button>
                  <Button
                    style={className.cartButton}
                    onClick={handleAddToCartClick}
                  >

                    <ShoppingCartOutlined />
                    Add to Cart
                  </Button>
               <LoginConfirmationDialog open={loginDialogOpen} onClose={handleClose} />
                </>
              ) : (
                ""
              )}
            </Box>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default ProductCard;
