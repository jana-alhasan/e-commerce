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
      <Typography style={classname.title}>Additional informations</Typography>
      <Typography style={classname.description}>
        Need something else? We will make it for you!
      </Typography>
      <Box style={classname.form}>
        <label style={classname.label}>Order Notes</label>
        <Controller
          name="additionalInformation"
          control={control}
          render={({ field }) => (
            <>
              <textarea
                placeholder="Need a specific delivery day? Sending a gitf? Let’s say ..."
                style={classname.additionalInformationArea}
                {...field}
              />
              <FormHelperText style={classname.Red}>
                {errors.additionalInformation &&
                  errors.additionalInformation.message}
              </FormHelperText>
            </>
          )}
        />
      </Box>
      <Typography style={classname.title}>Confirmation</Typography>
      <Typography style={classname.description}>
        We are getting to the end. Just few clicks and your order si ready!
      </Typography>
      <Box style={classname.differentAddress}>
        <FormControlLabel
          style={classname.differentAddresslabel}
          control={
            <Controller
              name="marketingEmails"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                   sx={{
                    color: errors.marketingEmails?"red":'#D1D1D1',
                    '&.Mui-checked': {
                      color: '#6A983C',
                    },
                  }}
                    // required
                    error={!!errors.marketingEmails}
                    {...field}
                  />
                  <FormHelperText style={classname.Red}>
                    {errors.marketingEmails && errors.marketingEmails.message}
                  </FormHelperText>
                </>
              )}
            />
          }
          label="I agree with sending Marketing and newsletter emails. No spam, promised!"
        />
      </Box>
      <Box style={classname.differentAddress}>
        <FormControlLabel
          style={classname.differentAddresslabel}
          control={
            <Controller
              name="termsAndConditions"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    // required
                    error={!!errors.termsAndConditions}
                    sx={{
                      color: errors.termsAndConditions?"red":'#D1D1D1',
                      '&.Mui-checked': {
                        color: '#6A983C',
                      },
                    }}
                    {...field}
                  />
                  <FormHelperText style={classname.Red}>
                    {errors.termsAndConditions &&
                      errors.termsAndConditions.message}
                  </FormHelperText>
                </>
              )}
            />
          }
          label="I agree with our terms and conditions and privacy policy."
        />
      </Box>
    </Box>
  );
}

export default AdditionalInfo;
