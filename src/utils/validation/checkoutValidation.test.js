import { checkoutSchema } from "./checkoutValidation";

const validCheckout = {
  firstName: "Jana",
  lastName: "Test",
  email: "jana@example.com",
  phoneNumber: "0591234567",
  address: "Test Street",
  city: "Nablus",
  state: "Palestine",
  postalCode: "12345",
  shipToDifferentAddress: false,
  additionalInformation: "",
  marketingEmails: false,
  termsAndConditions: true,
};

describe("checkoutSchema", () => {
  test("accepts a valid checkout without requiring marketing consent", async () => {
    await expect(checkoutSchema.validate(validCheckout)).resolves.toMatchObject({
      marketingEmails: false,
      termsAndConditions: true,
    });
  });

  test("requires terms and conditions agreement", async () => {
    await expect(
      checkoutSchema.validate({
        ...validCheckout,
        termsAndConditions: false,
      })
    ).rejects.toThrow("You must agree to the terms and privacy policy");
  });

  test("rejects malformed phone and postal values", async () => {
    await expect(
      checkoutSchema.validate({
        ...validCheckout,
        phoneNumber: "12ab",
        postalCode: "1234x",
      }, { abortEarly: false })
    ).rejects.toMatchObject({
      errors: expect.arrayContaining([
        "Phone number must contain only numeric characters",
        "Postal code must contain exactly 5 digits",
      ]),
    });
  });
});
