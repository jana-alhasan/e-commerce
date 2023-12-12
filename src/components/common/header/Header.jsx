import { Link ,useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
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
import { selectUser,resetUser } from "../../../redux/authSlice";
import { className } from "./styles";

const Header = () => {
  const user = useSelector(selectUser);
  const navigate=useNavigate();
  const dispatch = useDispatch();
  console.log("l", user)
  const handleAuthButtonClick = () => {
    if (user) {
      dispatch(resetUser());
      console.log("loggedOut", user)
    } else {
      navigate('/login');
      console.log("loggedOut", user)
    }
  };
  return (
    <AppBar style={className.header}>
      <Hidden smDown>
      <Toolbar style={className.toolbar}>     
        <Box style={className.toolbarItem}>
          <Typography style={className.subHeaderItemGreen}>
            chat with us
          </Typography>
          <Typography style={className.subHeaderItem}>
            +420 336 775 664
          </Typography>
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
      <Toolbar style={className.toolbar} >
            <img src="images/logo.svg" alt="brand" className="logo" />
            <Stack style={className.searchbar} display={{xs:'none' ,md:'flex'}}>
              <IconButton style={className.AllCategories}>
                All categories
                <KeyboardArrowDown style={className.green} />
              </IconButton>
              <Divider
                style={className.divider}
                orientation="vertical"
                flexItem
              />
              <TextField
                size="small"
                fullWidth
                id="search"
                variant="standard"
                placeholder="   Search Products, categories ..."
                InputProps={{
                  disableUnderline: true,    
                }}
                endadornment={
                  <InputAdornment position="end" style={className.icons}> 
                    <Search style={className.icons}/>
                  </InputAdornment>
                }
              ></TextField>
            </Stack>
            <Hidden mdUp>
            <Search style={className.icons}/>
            </Hidden>
          <Box style={className.toolbarItem} alignItems={"center"}>
            <Hidden smDown>
            <PersonOutlineOutlined style={className.icons} />
            <Link to="/cart">
            <ShoppingBagOutlined style={className.icons} />
            </Link>
            </Hidden>
            <IconButton style={className.subHeaderItemGreen}  onClick={handleAuthButtonClick}>
            <Login style={className.subHeaderItemGreen} />
            {user ? 'Logout' : 'Login'}    
            </IconButton>
     
          </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
