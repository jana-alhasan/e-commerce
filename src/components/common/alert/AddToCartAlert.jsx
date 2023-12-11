import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MyAlert = ({open,handleClose}) => {
 

  return (
    <div>
      {open && (
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          onClose={handleClose}
        >
          successfully Added to Cart
        </Alert>
      )}
    </div>
  );
};

export default MyAlert;
