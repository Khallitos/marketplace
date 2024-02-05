import * as yup from "yup";

export const ProductValidationSchema = yup.object().shape({
  Location: yup.string().required(),
  Title: yup.string().required(),
  ProductType: yup.string().required(),
  
});
