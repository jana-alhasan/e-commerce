import { Controller } from "react-hook-form";
import { Box, TextField, Typography, Button, Slider } from "@mui/material";
import { className } from "./styles";

function Price({ control, errors, setValue, getValues, handleReset }) {
  const handleSliderChange = (event, newValue) => {
    setValue("minPrice", newValue[0]);
    setValue("maxPrice", newValue[1]);
  };

  const handleTextFieldChange = (fieldName) => (event) => {
    const value = event.target.value;
    setValue(fieldName, value);

    const minPrice =
      fieldName === "minPrice" ? value : getValues("minPrice") || 0;
    const maxPrice =
      fieldName === "maxPrice" ? value : getValues("maxPrice") || 0;

    setValue("priceRange", [Number(minPrice), Number(maxPrice)]);
  };

  return (
    <Box margin="3rem 24px 0">
      <Typography variant="h6">Price</Typography>
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
            onChange={(event, value) => {
              field.onChange(value);
              handleSliderChange(event, value);
            }}
            style={className.price}
          />
        )}
      />

      <Box style={className.minMaxContainer}>
        <Controller
          name="minPrice"
          control={control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              label="Min"
              type="number"
              error={Boolean(errors.minPrice)}
              helperText={errors.minPrice?.message}
              InputProps={{ style: className.minMax }}
              onChange={handleTextFieldChange("minPrice")}
            />
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
              error={Boolean(errors.maxPrice)}
              helperText={errors.maxPrice?.message}
              onChange={handleTextFieldChange("maxPrice")}
              InputProps={{ style: className.minMax }}
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
          type="button"
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
