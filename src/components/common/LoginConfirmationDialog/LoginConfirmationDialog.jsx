import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';


function LoginConfirmationDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login Required</DialogTitle>
      <DialogContent>
        <p>Please log in to add items to your cart.</p>
      </DialogContent>
      <DialogActions>
      <Button onClick={onClose}>Cancel</Button> 
         <Button component={Link} to="/login" color="primary">
          Log In
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginConfirmationDialog