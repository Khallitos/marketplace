import * as yup from "yup";

export const ProductValidationSchema = yup.object().shape({
  Region: yup.string().required(),
  RegionSurberb: yup.string().required(),
  Title: yup.string().required(),
  ProductType: yup.string().required(),
  
});
