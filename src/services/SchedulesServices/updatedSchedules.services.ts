import AppDataSource from "../../data-source";
import { OpeningHour } from "../../entities/openingHours.entity";
import { AppError } from "../../errors/AppError";

const updatedSchedulesService = async (
  dataUpdatedSchedule: any,
  idSchedule: string
): Promise<any> => {
  const { openTime, closingTime } = dataUpdatedSchedule;
  const schedulesRepository = AppDataSource.getRepository(OpeningHour);
  const findSchedule = await schedulesRepository.findOne({
    where: { id: idSchedule },
  });
  if (!findSchedule) {
    throw new AppError(404, "Schedule does not exist");
  }
  if (openTime && closingTime) {
    findSchedule.closingTime = closingTime;
    findSchedule.openTime = openTime;
  }
  const scheduleUpdated = await schedulesRepository.save(findSchedule);
  return scheduleUpdated;
};

export default updatedSchedulesService;
