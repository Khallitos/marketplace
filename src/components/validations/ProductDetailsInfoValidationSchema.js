import * as yup from "yup";

export const ProductDetailsInfoValidationSchema = yup.object().shape({
    SubCategory: yup.string().required(),
    Brand: yup.string().required(),
    Description: yup.string().required(),
    Price: yup.number().required(),
    Condition: yup.string().required(),
    Swappable: yup.string().required(),
    Negotiable: yup.string().required(),

});

