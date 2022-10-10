import * as yup from "yup";

export const validProductSchema = yup.object().shape({
    name: yup.string().required(),
    supplier: yup.string().required(),
    description: yup.string(),
    price: yup.number().required(),
    imageUrl: yup.string()
})