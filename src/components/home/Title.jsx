import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Number from "./Number";
import { GridOn,ReorderSharp } from "@material-ui/icons";
import { className } from "./styles";

const Title = ({count,setGridView}) => {

  const handleGridView = (event) => {
    setGridView(true);
  };
  const handleListView = (event) => {
    setGridView(false);
  };
  return (
    <Box style={className.titleContainer}>
      <Typography style={className.title}>Categories</Typography>
      <Box style={className.views}>
      <IconButton style={className.viewButton} onClick={(e)=>handleGridView()}>
        <GridOn/>
        Grid view
      </IconButton>
      <IconButton style={className.viewButton} onClick={(e)=>handleListView()}>
        <ReorderSharp/>
        List view
        </IconButton>
        <Box display={{xs:'none', sm:'none',lg:'flex'}}>
      <Number count={count} />
      </Box>
      </Box>
    </Box>
  );
};

export default Title;
