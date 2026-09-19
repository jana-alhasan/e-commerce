import { Tab,Tabs,Box,Typography } from "@mui/material";
import { className } from "./styles";

function MyTabs() {
  const tabStyles = {
    textColor: 'var(--c-1-a, #151515)', 
    indicatorColor: '#6A983C', 
  };
  return (
    <>
      <Tabs value={0} {...tabStyles}>
        <Tab label="Description" style={{ color: tabStyles.textColor }} />
        <Tab label="Reviews" />
        <Tab label="Questions" />
      </Tabs>
      <Box value={0} index={0}>
        <Typography variant="h6" style={className.Topspace}>
          Origins
        </Typography>
        <Typography variant="p">
          We work hard to ensure that the fruit and vegetables we sell are fresh
          and high in quality. If we don’t grow them ourselves, we source them
          from carefully chosen suppliers, preferring to buy locally whenever
          possible.
        </Typography>
        <Typography variant="h6" style={className.Topspace}>
          How to cook
        </Typography>
        <Typography variant="p">
          From roasts, salads and soups to casseroles and cakes, Carrots will
          lend sweetness, texture and colour to an enormous number of recipes.
        </Typography>
        <Typography variant="h6" style={className.Topspace}>
          Full of Vitamins!
        </Typography>
      </Box>
    </>
  );
}

export default MyTabs;
