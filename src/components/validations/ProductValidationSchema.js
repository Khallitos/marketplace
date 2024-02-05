import * as yup from "yup";

export const ProductValidationSchema = yup.object().shape({
  Title: yup.string().required(),
  productData: yup.string().required(),
  Description: yup.string().required(),
  Price: yup.string().required(),
});
