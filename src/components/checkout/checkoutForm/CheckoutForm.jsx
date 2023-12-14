import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  MenuItem,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { classname } from "./styles";

function CheckoutForm({ control, errors, statesAndCountries }) {
  return (
    <Box style={classname.formContainer} display={"flex"} gap={4}>
      <Box style={classname.form}>
        <label style={classname.label}>First Name</label>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors.firstName}
              helperText={errors.firstName && errors.firstName.message}
              size="small"
              InputProps={{ style: classname.field }}
              placeholder="First name"
              {...field}
            />
          )}
        />

        <label style={classname.label}>Email Address</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors.firstName}
              size="small"
              InputProps={{ style: classname.field }}
              placeholder="Email Address"
              {...field}
              helperText={errors.email && errors.email.message}
            />
          )}
        />

        <label style={classname.label}>Address</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors.address}
              helperText={errors.address && errors.address.message}
              size="small"
              InputProps={{ style: classname.field }}
              placeholder="Address"
              {...field}
            />
          )}
        />

        <label style={classname.label}>State / Country</label>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
            select
            error={!!errors.state}
            helperText={errors.state && errors.state.message}
            size="small"
            InputProps={{ style: classname.field }}
            placeholder="Choose a state or Country"
            {...field}
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
              <Checkbox style={{ color: "var(--c-1-d, #D1D1D1)" }} {...field} />
            )}
          />
          <label style={classname.differentAddresslabel}>
            Ship to a different address?
          </label>
        </Box>
      </Box>
      <Box style={classname.form}>
        <label style={classname.label}>Last Name</label>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors.lastName}
              helperText={errors.lastName && errors.lastName.message}
              size="small"
              InputProps={{ style: classname.field }}
              placeholder="Last name"
              {...field}
            />
          )}
        />

        <label style={classname.label}>Phone Number</label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber && errors.phoneNumber.message}
              size="small"
              InputProps={{ style: classname.field }}
              placeholder="Phone Number"
              {...field}
            />
          )}
        />

        <label style={classname.label}>Town / City</label>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors.city}
              helperText={errors.city && errors.city.message}
              size="small"
              InputProps={{ style: classname.field }}
              placeholder="Town or City"
              {...field}
            />
          )}
        />

        <label style={classname.label}>ZIP/Postal Code</label>
        <Controller
          name="postalCode"
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors.postalCode}
              helperText={errors.postalCode && errors.postalCode.message}
              size="small"
              InputProps={{ style: classname.field }}
              placeholder="Postal code or ZIP"
              {...field}
            />
          )}
        />
      </Box>
    </Box>
  );
}

export default CheckoutForm;
