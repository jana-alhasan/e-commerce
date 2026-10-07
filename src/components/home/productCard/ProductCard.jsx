import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Hidden,
  Stack,
} from "@mui/material";
import { KeyboardArrowRight, ShoppingCartOutlined } from "@mui/icons-material";
import Detail from "../../common/detail/Detail";
import Rating from "../../common/rating/Rating";
import Title from "../../common/title/Title";
import Description from "./Description";
import { addToCart } from "../../../redux/cartSlice";
import { selectUser } from "../../../redux/authSlice";
import { className } from "./styles";
import LoginConfirmationDialog from "../../common/LoginConfirmationDialog/LoginConfirmationDialog";

const ProductCard = ({ product, isGridView }) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const {
    id,
    title = "Untitled product",
    price = 0,
    category = "Not provided",
    description = "",
    image = "",
    rating = {},
    stock,
    availabilityStatus,
    shippingInformation,
  } = product || {};

  const handleAddToCartClick = () => {
    if (!user?.token) {
      setLoginDialogOpen(true);
      return;
    }

    if (product) {
      dispatch(addToCart(product));
    }
  };

  const handleProductDetailClick = () => {
    if (id !== undefined && id !== null) {
      navigate(`/product/${id}`);
    }
  };

  const detailsArray = [
    { label: "Category", value: category },
    availabilityStatus && { label: "Availability", value: availabilityStatus },
    stock !== null && stock !== undefined && { label: "Stock", value: `${stock} items` },
    shippingInformation && { label: "Shipping", value: shippingInformation },
  ].filter(Boolean);

  return (
    <Card style={className.cardContainer}>
      <Stack flexDirection={isGridView ? "column" : "row"}>
        <Box
          className="imageContainer"
          display="flex"
          height="280px"
          width="100%"
          maxWidth={isGridView ? "100%" : { sm: "200px", lg: "200px" }}
          justifyContent={isGridView ? "center" : "start"}
        >
          <CardMedia
            component="img"
            image={image}
            style={className.media}
            alt={title}
            onClick={handleProductDetailClick}
          />
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
              <Title content={title} />
              <Description description={description} />
              <Hidden smDown>
                <Rating rate={rating.rate} />
                {!isGridView &&
                  detailsArray.map((detail) => (
                    <Detail
                      key={detail.label}
                      label={detail.label}
                      value={detail.value}
                    />
                  ))}
              </Hidden>
            </Box>
            <Box
              style={className.cardItemGrid}
              flexDirection={isGridView ? "row" : "column"}
              alignItems={isGridView ? "center" : "start"}
              gap="1rem"
              justifyContent="space-between"
            >
              <Title content={`${price} USD`} />
              {isGridView ? (
                <Button style={className.buyNow} onClick={handleAddToCartClick}>
                  Add To Cart
                </Button>
              ) : (
                <>
                  <Button
                    style={className.detailButton}
                    onClick={handleProductDetailClick}
                  >
                    Product Detail
                    <KeyboardArrowRight />
                  </Button>
                  <Button style={className.cartButton} onClick={handleAddToCartClick}>
                    <ShoppingCartOutlined />
                    Add to Cart
                  </Button>
                </>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Stack>
      <LoginConfirmationDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
    </Card>
  );
};

export default ProductCard;
