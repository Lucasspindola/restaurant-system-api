import * as yup from "yup";
import { SchemaOf } from "yup";
import { INewRestaurantRequest } from "../interfaces/restaurants";

const newRestaurantRequestSerializer: SchemaOf<INewRestaurantRequest> = yup
  .object()
  .shape({
    name: yup.string().required().max(200),
    email: yup.string().email().required().max(150),
    phone: yup
      .string()
      .matches(/^[0-9]+$/)
      .min(8)
      .max(11)
      .required(),
    document: yup.string().required(),
    description: yup.string().required(),
    profileImage: yup.string().required(),
    password: yup.string().required().min(8),
    typeRestaurant: yup.string().required(),
  });

const restaurantWithoutPasswordFieldSerializer = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().optional(),
  phone: yup.string().optional(),
  document: yup.string().optional(),
  description: yup.string().required(),
  profileImage: yup.string().url().optional(),
  typeRestaurant: yup.object().shape({
    id: yup.string().uuid().required(),
  }),
  id: yup.string().uuid().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
});
export {
  newRestaurantRequestSerializer,
  restaurantWithoutPasswordFieldSerializer,
};
