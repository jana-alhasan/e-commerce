import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only numeric characters")
    .min(10, "Phone number must be at least 10 characters")
    .max(14, "Phone number must be at most 14 characters"),
  address: yup.string().trim().required("Address is required"),
  city: yup.string().trim().required("City is required"),
  state: yup.string().required("State / Country is required"),
  postalCode: yup
    .string()
    .trim()
    .matches(/^[0-9]{5}$/, "Postal code must contain exactly 5 digits")
    .required("Postal code is required"),
  shipToDifferentAddress: yup.boolean().default(false),
  additionalInformation: yup
    .string()
    .max(500, "Additional information must be at most 500 characters"),
  marketingEmails: yup.boolean().default(false),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and privacy policy")
    .required("You must agree to the terms and privacy policy"),
});
