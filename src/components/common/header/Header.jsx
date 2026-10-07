import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Divider,
  InputAdornment,
  TextField,
  Stack,
  Hidden,
} from "@mui/material";
import {
  ShoppingBagOutlined,
  KeyboardArrowDown,
  Search,
  PersonOutlineOutlined,
  Login,
} from "@mui/icons-material";
import { selectUser, resetUser } from "../../../redux/authSlice";
import { clearCart } from "../../../redux/cartSlice";
import { className } from "./styles";

const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <AppBar style={className.header}>
      <Hidden smDown>
        <Toolbar style={className.toolbar}>
          <Box style={className.toolbarItem}>
            <Typography style={className.subHeaderItemGreen}>
              Chat with us
            </Typography>
            <Typography style={className.subHeaderItem}>+420 336 775 664</Typography>
            <Typography style={className.subHeaderItem}>
              info@freshnesecom.com
            </Typography>
          </Box>
          <Box style={className.toolbarItem}>
            <Typography style={className.subHeaderItemGreen}>Blog</Typography>
            <Typography style={className.subHeaderItemGreen}>About us</Typography>
            <Typography style={className.subHeaderItemGreen}>Careers</Typography>
          </Box>
        </Toolbar>
      </Hidden>
      <Toolbar style={className.toolbar}>
        <Link to="/" aria-label="Freshnesecom home">
          <img src="images/logo.svg" alt="Freshnesecom" className="logo" />
        </Link>
        <Stack style={className.searchbar} display={{ xs: "none", md: "flex" }}>
          <IconButton style={className.AllCategories} aria-label="All categories">
            All categories
            <KeyboardArrowDown style={className.green} />
          </IconButton>
          <Divider style={className.divider} orientation="vertical" flexItem />
          <TextField
            size="small"
            fullWidth
            id="search"
            variant="standard"
            placeholder="Search products, categories ..."
            inputProps={{ "aria-label": "Search products and categories" }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end" style={className.icons}>
                  <Search style={className.icons} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Hidden mdUp>
          <Search style={className.icons} aria-label="Search" />
        </Hidden>
        <Box style={className.toolbarItem} alignItems="center">
          <Hidden smDown>
            <PersonOutlineOutlined style={className.icons} aria-hidden="true" />
            <Link to="/cart" aria-label="Shopping cart">
              <ShoppingBagOutlined style={className.icons} />
            </Link>
          </Hidden>
          <IconButton
            style={className.subHeaderItemGreen}
            onClick={handleAuthButtonClick}
            aria-label={user?.token ? "Log out" : "Log in"}
          >
            <Login style={className.subHeaderItemGreen} />
            {user?.token ? "Logout" : "Login"}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
