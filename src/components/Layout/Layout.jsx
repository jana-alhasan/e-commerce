import { Container,Box } from "@mui/material";
import Header from "../common/header/Header";
import MyBreadcrumbs from "../common/breadCrumbs/BreadCrumb";
import Footer from "../common/footer/Footer";

const footerData = [
  {
    title: "Get in touch",
    footerContent: ["About Us", "Careers", "Press Releases", "Blog"],
  },
  {
    title: "Connections",
    footerContent: [
      "Facebook",
      "Twitter",
      "Instagram",
      "Youtube",
      "LinkedIn",
    ],
  },
  {
    title: "Earnings",
    footerContent: [
      "Become an Affiliate",
      "Advertise your product",
      "Sell on Market",
    ],
  },
  {
    title: "Account",
    footerContent: [
      "Your account",
      "Returns Centre",
      "100 % purchase protection",
      "Chat with us",
      "Help",
    ],
  },
];
const Layout = ({ children }) => (
  <Box>
    <Header/>
    <Container maxWidth="xxl">
    <MyBreadcrumbs/>
    {children}
    <Footer footerData={footerData} />
    </Container>
  </Box>
);
export default Layout;