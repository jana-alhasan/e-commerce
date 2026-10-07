import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";
import { className } from "./styles";

const Rating = ({ rate, customstyle = {} }) => {
  const numericRate = Number(rate) || 0;
  const stars = Array.from({ length: 5 }, (_, index) =>
    numericRate >= index + 1 ? (
      <StarIcon key={index} style={customstyle} aria-hidden="true" />
    ) : (
      <StarBorderOutlinedIcon
        key={index}
        style={customstyle}
        aria-hidden="true"
      />
    )
  );

  return (
    <Box
      style={className.rating}
      id="rating"
      aria-label={`Rating ${numericRate} out of 5`}
    >
      {stars}
      <span>{numericRate}</span>
    </Box>
  );
};

export default Rating;
