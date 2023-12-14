import * as yup from "yup";

export const validationSchema = yup.object().shape({
  minPrice: yup.number().min(0, "Min price must be greater than or equal to 0"),
  maxPrice: yup.number()
      .when("minPrice", (minPrice, schema) => {
          return schema.min(0, "Max price must be greater than or equal to 0");
      })
      .when("minPrice", (minPrice, schema) => {
          return schema.test({
              test: (maxPrice) => {
                  if (minPrice != null) {
                      return maxPrice == null || (maxPrice >= minPrice || maxPrice === 0);
                  }
                  return true;
              },
              message: "Max price must be greater than or equal to Min price",
          });
      }),
});