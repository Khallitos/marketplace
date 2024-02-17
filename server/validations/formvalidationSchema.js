import * as yup from "yup";

export const formvalidationSchema = yup.object().shape({
    Region: yup.string().required(),
    RegionSurberb: yup.string().required(),
    Title: yup.string().required(),
    ProductType: yup.string().required(),
    SubCategory: yup.string().required(),
    Brand: yup.string().required(),
    Description: yup.string().required(),
    Price: yup.number().required(),
    Condition: yup.string().required(),
    Swappable: yup.string().required(),
    Negotiable: yup.string().required(),
});

