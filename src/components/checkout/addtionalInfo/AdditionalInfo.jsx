import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { classname } from "./styles";

function AdditionalInfo({ control, errors }) {
  return (
    <Box style={classname.BillingInfo}>
      <Typography style={classname.title}>Additional information</Typography>
      <Typography style={classname.description}>
        Add an optional note for this demo order.
      </Typography>
      <Box style={classname.form}>
        <label htmlFor="additionalInformation" style={classname.label}>
          Order Notes
        </label>
        <Controller
          name="additionalInformation"
          control={control}
          render={({ field }) => (
            <>
              <textarea
                {...field}
                id="additionalInformation"
                placeholder="Need a specific delivery day? Sending a gift? Add a note here."
                style={classname.additionalInformationArea}
              />
              <FormHelperText style={classname.Red}>
                {errors.additionalInformation?.message}
              </FormHelperText>
            </>
          )}
        />
      </Box>

      <Typography style={classname.title}>Confirmation</Typography>
      <Typography style={classname.description}>
        Review the optional marketing preference and required terms agreement.
      </Typography>

      <Box style={classname.differentAddress}>
        <Controller
          name="marketingEmails"
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
                  sx={{
                    color: "#D1D1D1",
                    "&.Mui-checked": { color: "#6A983C" },
                  }}
                />
              }
              label="I would like to receive marketing and newsletter emails."
            />
          )}
        />
      </Box>

      <Box style={classname.differentAddress}>
        <Controller
          name="termsAndConditions"
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
                  sx={{
                    color: errors.termsAndConditions ? "red" : "#D1D1D1",
                    "&.Mui-checked": { color: "#6A983C" },
                  }}
                />
              }
              label="I agree with the terms and conditions and privacy policy."
            />
          )}
        />
        <FormHelperText style={classname.Red}>
          {errors.termsAndConditions?.message}
        </FormHelperText>
      </Box>
    </Box>
  );
}

export default AdditionalInfo;
