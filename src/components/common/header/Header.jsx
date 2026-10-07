import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  LoginOutlined,
  LogoutOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { resetUser, selectUser } from "../../../redux/authSlice";
import { clearCart, selectCartItems } from "../../../redux/cartSlice";

const Header = () => {
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemCount = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const handleAuthButtonClick = () => {
    if (user?.token) {
      dispatch(resetUser());
      dispatch(clearCart());
      navigate("/");
      return;
    }

    navigate("/login");
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar sx={{ gap: 2, justifyContent: "space-between", py: 1 }}>
        <Stack
          component={Link}
          to="/"
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ color: "inherit", textDecoration: "none" }}
          aria-label="Freshnesecom home"
        >
          <Box
            component="img"
            src="images/logo.svg"
            alt="Freshnesecom"
            className="logo"
            sx={{ maxWidth: { xs: 145, sm: 180 } }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            component={Link}
            to="/cart"
            color="inherit"
            startIcon={<ShoppingBagOutlined />}
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <Typography component="span" display={{ xs: "none", sm: "inline" }}>
              Cart
            </Typography>
            {itemCount > 0 && <Typography component="span"> ({itemCount})</Typography>}
          </Button>

          <Button
            color="primary"
            onClick={handleAuthButtonClick}
            startIcon={user?.token ? <LogoutOutlined /> : <LoginOutlined />}
            aria-label={user?.token ? "Log out" : "Log in"}
          >
            {user?.token ? "Logout" : "Login"}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
