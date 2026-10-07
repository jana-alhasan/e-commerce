import { Box, Container } from "@mui/material";
import Header from "../common/header/Header";
import MyBreadcrumbs from "../common/breadCrumbs/BreadCrumb";
import Footer from "../common/footer/Footer";

const Layout = ({ children }) => (
  <Box>
    <Header />
    <Container maxWidth="xxl">
      <MyBreadcrumbs />
      {children}
      <Footer />
    </Container>
  </Box>
);

export default Layout;
