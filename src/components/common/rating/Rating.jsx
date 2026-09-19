import React,{useState} from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@material-ui/core";
import { className } from "./styles";

const Rating = ({rate,customstyle={}}) => {
  
const stars = Array.from({ length: 5 }, (_, index) => (
    rate >= index + 1 ? (
      <StarIcon
        key={index}
        style={customstyle}
  
      />
    ) : (
      <StarBorderOutlinedIcon
        key={index}
        style={customstyle}
      />
    )
  ));

  return (
    <Box style={className.rating} id="rating">
      {stars}
      <span >{rate}</span>
    </Box>
  );
};

export default Rating;
