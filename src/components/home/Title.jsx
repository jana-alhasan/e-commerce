import { Box, Typography, IconButton } from "@mui/material";
import { GridOn, ReorderSharp } from "@mui/icons-material";
import Number from "./Number";
import { className } from "./styles";

const Title = ({ count, setGridView }) => {
  return (
    <Box style={className.titleContainer}>
      <Typography style={className.title}>Categories</Typography>
      <Box style={className.views}>
        <IconButton
          style={className.viewButton}
          onClick={() => setGridView(true)}
          aria-label="Grid view"
        >
          <GridOn />
          Grid view
        </IconButton>
        <IconButton
          style={className.viewButton}
          onClick={() => setGridView(false)}
          aria-label="List view"
        >
          <ReorderSharp />
          List view
        </IconButton>
        <Box display={{ xs: "none", sm: "none", lg: "flex" }}>
          <Number count={count} />
        </Box>
      </Box>
    </Box>
  );
};

export default Title;
