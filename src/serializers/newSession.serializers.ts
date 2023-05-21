import * as yup from "yup";
import { SchemaOf } from "yup";
import { IRestaurantLogin } from "../interfaces/restaurants";

const newSessionSerializer: SchemaOf<IRestaurantLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export { newSessionSerializer };
