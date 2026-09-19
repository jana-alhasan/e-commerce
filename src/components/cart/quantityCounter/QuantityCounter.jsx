// QuantityCounter.jsx
import React, { useState } from 'react';
import { IconButton, Divider, Typography, Box } from '@mui/material';
import { Add,Remove,FavoriteBorder,DeleteOutline } from '@material-ui/icons';
import { className } from './styles';

const QuantityCounter = ({ quantity, onIncrement, onDecrement ,clearCart,customStyle}) => {
  return (
    <Box style={className.iconContainer}>
    <Box style={className.quantity}>
      <IconButton onClick={onDecrement}>
        <Remove style={className.icon} />
      </IconButton>
      <Divider orientation="vertical" flexItem />
      <Typography variant="body1" style={customStyle?customStyle:className.number}>{quantity}</Typography>
      <Divider orientation="vertical" flexItem />
      <IconButton onClick={onIncrement}>
        <Add style={customStyle?customStyle:className.icon} />
      </IconButton>
    </Box>
    <IconButton >
    <FavoriteBorder/>
    </IconButton>
    <IconButton>
    <DeleteOutline onClick={clearCart}/>
    </IconButton>
    </Box>

  );
};

export default QuantityCounter;
