import AppDataSource from "../../data-source";
import { OpeningHour } from "../../entities/openingHours.entity";
import { AppError } from "../../errors/AppError";

const deleteSchedulesService = async (
  dayWeekId: string,
  openingTimeId: string
): Promise<any> => {
  const schedulesRepository = AppDataSource.getRepository(OpeningHour);
  let findSchedules = await schedulesRepository.findOneBy({
    id: openingTimeId,
    dayWeek: { id: dayWeekId },
  });

  if (!findSchedules) {
    throw new AppError(404, "schedule  not exists");
  }
  schedulesRepository.remove(findSchedules);

  return { message: "successfully deleted" };
};

export default deleteSchedulesService;
