import { Typography, Box } from "@mui/material";
import Rating from "../../common/rating/Rating";
import { className } from "./styles";

function ProductInfo({ title, rate, description, reviewCount = 0 }) {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <Box style={className.ratingBox}>
        <Rating rate={rate} customstyle={{ color: "#FDBC15" }} />
        <Typography style={className.description}>
          ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </Typography>
      </Box>
      <Typography>{description}</Typography>
    </>
  );
}

export default ProductInfo;
