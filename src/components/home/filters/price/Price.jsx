import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Typography,
  Button,
  Slider,
} from "@mui/material";
import { className } from "./styles";

function Price({ control, errors, setValue, getValues,handleReset }) {
 

  const handleSliderChange = (event, newValue) => {
    setValue("minPrice", newValue[0]);
    setValue("maxPrice", newValue[1]);
  };
  const handleTextFieldChange = (fieldName) => (event) => {
    setValue(fieldName, event.target.value);
    if (fieldName === "minPrice" || fieldName === "maxPrice") {
      const minPrice = getValues("minPrice");
      const maxPrice = getValues("maxPrice");
      setValue("priceRange", [minPrice, maxPrice]);
    }
  };

  return (
    <Box margin={"3rem 24px 0"}>
      <Typography variant="h6">Price</Typography>
      <Box>
        <Controller
          name="priceRange"
          control={control}
          defaultValue={[0, 1000]}
          render={({ field }) => (
            <Slider
              {...field}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={1}
              onChange={(e, value) => {
                field.onChange(value);
                handleSliderChange(e, value);
              }}
              style={className.price}
            />
          )}
        />
      </Box>
      <Box style={className.minMaxContainer}>
        <Controller
          name="minPrice"
          control={control}
          defaultValue="0"
          render={({ field }) => (
            <Box>
            <TextField
              {...field}
              label="Min"
              type="number"
              error={!!errors.minPrice}
              helperText={errors.minPrice?.message}
              InputProps={{ style: className.minMax}}
              onChange={handleTextFieldChange("minPrice")}
        
            />
            </Box>
          )}
        />

        <Controller
          name="maxPrice"
          control={control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              label="Max"
              type="number"
              error={!!errors.maxPrice}
              helperText={errors.maxPrice?.message}
              onChange={handleTextFieldChange("maxPrice")}
              InputProps={{ style: className.minMax}}
       
            />
          )}
        />


      </Box>
      <Box style={className.minMaxContainer}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={className.apply}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          onClick={handleReset}
          style={className.reset}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default Price;
