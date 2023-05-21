import * as yup from "yup";
import { SchemaOf } from "yup";
import { INewSchedule } from "../interfaces/shedules";

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

export { newScheduleSerializer };
