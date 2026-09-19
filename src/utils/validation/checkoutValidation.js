import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber:yup.string().required("Phone number is required")
  .matches(/^[0-9]+$/, "Phone number must contain only numeric characters")
  .min(10, "Phone number must be at least 10 characters")
  .max(14, "Phone number must be at most 14 characters"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  postalCode: yup
    .string()
    .length(5)
    .matches(/^[0-9]{5}/)
    .required(),
  additionalInformation: yup.string().max(500, 'Additional information must be at most 500 characters'),
  marketingEmails: yup
  .boolean()
  .oneOf([true], 'You must agree to receive marketing and newsletter emails')
  .required('You must agree to receive marketing and newsletter emails'),
  termsAndConditions: yup
  .boolean()
  .oneOf([true], 'You must agree to our terms and conditions and privacy policy')
  .required('You must agree to our terms and conditions and privacy policy'),
});
 