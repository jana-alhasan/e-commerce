import { Grid, Typography, Box } from "@mui/material";
import Title from "../title/Title";
import { className } from "./styles";

const Footer = ({ footerData }) => {
  return (
    <Grid container>
      {footerData.map((column) => (
        <Grid item key={column.title} md={3} sm={6} xs={12} margin="2rem 0">
          <Title content={column.title} />
          <Box style={className.footerContainer}>
            {column.footerContent.map((text) => (
              <Typography style={className.footerItem} key={text}>
                {text}
              </Typography>
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Footer;
