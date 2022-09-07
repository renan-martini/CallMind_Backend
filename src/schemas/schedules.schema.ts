import * as yup from "yup";
import { SchemaOf } from "yup";
import { IScheduleCreateRequest } from "../interfaces/schedules";

const schedulesSchema: SchemaOf<IScheduleCreateRequest> = yup.object().shape({
  date: yup.string().required(),
  hour: yup.string().required(),
});

export default schedulesSchema;
