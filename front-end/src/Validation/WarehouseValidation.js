import * as yup from "yup";

export const validWarehouseSchema = yup.object().shape({
    name: yup.string().required(),
    location: yup.string().required(),
    maxCapacity: yup.number().moreThan(0).required(),
    currCapacity: yup.number().min(0).max(yup.ref('maxCapacity')),
    product: yup.string()
})