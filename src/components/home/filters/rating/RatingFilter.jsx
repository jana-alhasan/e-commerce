import React from 'react';
import { Checkbox, FormControl, FormControlLabel, Box, Typography } from '@mui/material';
import { StarBorder, Star } from '@mui/icons-material';
import { className } from './styles';

const generateRatingLabel = (rating) => {
  const filledStars = Array.from({ length: rating }, (_, index) => (
    <Star key={`filled-${index}`} fontSize="small" style={className.filledStar} />
  ));
  const outlinedStars = Array.from({ length: 5 - rating }, (_, index) => (
    <StarBorder key={`outlined-${index}`} fontSize="small" style={className.outlinedStar} />
  ));

  return (
    <>
      {filledStars}
      {outlinedStars}
    </>
  );
};

const ratings = Array.from({ length: 5 }, (_, index) => ({
  label: generateRatingLabel(index + 1),
  value: index + 1,
}));

const Rating = ({ onChange, selectedRating }) => {
  const handleRatingChange = (value) => {
    onChange(value);
  };

  return (
    <Box>
      <Typography variant="h6" style={className.filterTitle}>
        Rating
      </Typography>
      <FormControl component="fieldset" variant="standard" style={className.formControl}>
        {ratings.map((rating, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                sx={{
                  color: '#D1D1D1',
                  '&.Mui-checked': {
                    color: '#6A983C',
                  },
                }}
                checked={selectedRating === rating.value}
                onChange={() => handleRatingChange(rating.value)}
              />
            }
            label={rating.label}
          />
        ))}
      </FormControl>
    </Box>
  );
};

export default Rating;
