import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  MenuItem,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { classname } from "./styles";

function CheckoutForm({ control, errors, statesAndCountries }) {
  return (
    <Box style={classname.formContainer} display="flex" gap={4}>
      <Box style={classname.form}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
              size="small"
              InputProps={{ style: classname.field }}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email Address"
              type="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              size="small"
              InputProps={{ style: classname.field }}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
              size="small"
              InputProps={{ style: classname.field }}
            />
          )}
        />

        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="State / Country"
              error={Boolean(errors.state)}
              helperText={errors.state?.message}
              size="small"
              InputProps={{ style: classname.field }}
            >
              <MenuItem value="">Select...</MenuItem>
              {statesAndCountries.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box style={classname.differentAddress}>
          <Controller
            name="shipToDifferentAddress"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                style={classname.differentAddresslabel}
                control={
                  <Checkbox
                    checked={Boolean(field.value)}
                    onChange={(_, checked) => field.onChange(checked)}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    style={{ color: "var(--c-1-d, #D1D1D1)" }}
                  />
                }
                label="Ship to a different address?"
              />
            )}
          />
        </Box>
      </Box>

      <Box style={classname.form}>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
              size="small"
              InputProps={{ style: classname.field }}
            />
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              inputMode="numeric"
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber?.message}
              size="small"
              InputProps={{ style: classname.field }}
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Town / City"
              error={Boolean(errors.city)}
              helperText={errors.city?.message}
              size="small"
              InputProps={{ style: classname.field }}
            />
          )}
        />

        <Controller
          name="postalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="ZIP / Postal Code"
              inputMode="numeric"
              error={Boolean(errors.postalCode)}
              helperText={errors.postalCode?.message}
              size="small"
              InputProps={{ style: classname.field }}
            />
          )}
        />
      </Box>
    </Box>
  );
}

export default CheckoutForm;
