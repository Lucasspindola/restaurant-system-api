import AppDataSource from "../../data-source";
import { DayWeek } from "../../entities/daysWeek.entity";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { OpeningHour } from "../../entities/openingHours.entity";
import { AppError } from "../../errors/AppError";
import { IResponseNewSchedule } from "../../interfaces/shedules";

const validDaysOfWeek = [
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
  "domingo",
];

const createNewSchedulesService = async (
  dataSchedules: any,
  restaurantId: string
): Promise<IResponseNewSchedule> => {
  const { dayWeek, openTime, closingTime } = dataSchedules;

  if (!validDaysOfWeek.includes(dayWeek.toLowerCase())) {
    throw new AppError(422, "The value of 'dayWeek' is invalid.");
  }

  const schedulesRepository = AppDataSource.getRepository(OpeningHour);
  const weekDayRepository = AppDataSource.getRepository(DayWeek);

  let findWeekDay = await weekDayRepository.findOne({
    where: { dayWeek: dataSchedules.dayWeek, restaurant: { id: restaurantId } },
    withDeleted: true,
  });

  if (!findWeekDay) {
    findWeekDay = weekDayRepository.create({
      dayWeek: dataSchedules.dayWeek,
      restaurant: { id: restaurantId },
    });

    await weekDayRepository.save(findWeekDay);
  }

  const conflictingSchedules = await schedulesRepository.find({
    where: {
      dayWeek: { id: findWeekDay.id },
      openTime: LessThanOrEqual(closingTime),
      closingTime: MoreThanOrEqual(closingTime),
    },
  });

  if (conflictingSchedules.length > 0) {
    throw new AppError(
      422,
      "Conflicting schedule. Please choose a different time."
    );
  }

  const conflictingSchedulesx = await schedulesRepository.find({
    where: {
      dayWeek: { id: findWeekDay.id },
      openTime: LessThanOrEqual(openTime),
      closingTime: MoreThanOrEqual(openTime),
    },
  });

  if (conflictingSchedulesx.length > 0) {
    throw new AppError(
      422,
      "Conflicting schedule. Please choose a different time."
    );
  }

  const newSchedule = {
    openTime,
    closingTime,
  };

  const scheduleCreated = schedulesRepository.create({
    ...newSchedule,
    dayWeek: { id: findWeekDay.id },
    restaurant: { id: restaurantId },
  });
  await schedulesRepository.save(scheduleCreated);
  return { ...scheduleCreated };
};

export default createNewSchedulesService;
