import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  INewSchedule,
  IRequestIsOpen,
  IUpdatedSchedule,
} from "../interfaces/shedules";

const newScheduleSerializer: SchemaOf<INewSchedule> = yup.object().shape({
  dayWeek: yup.string().required(),
  openTime: yup
    .string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  closingTime: yup
    .string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
});

const updatedSchedule: SchemaOf<IUpdatedSchedule> = yup.object().shape({
  openTime: yup
    .string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  closingTime: yup
    .string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
});

const isOpenSchedule: SchemaOf<IRequestIsOpen> = yup.object().shape({
  date: yup.string().required(),
  hour: yup
    .string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  restaurantId: yup.string().required(),
});

export { newScheduleSerializer, updatedSchedule, isOpenSchedule };
