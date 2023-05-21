import AppDataSource from "../../data-source";
import { DayWeek } from "../../entities/daysWeek.entity";
import { OpeningHour } from "../../entities/openingHours.entity";
import { Restaurant } from "../../entities/restaurant.entity";
import { TypeRestaurant } from "../../entities/typeRestaurant.entity";
import { AppError } from "../../errors/AppError";
import { restaurantWithoutPasswordFieldSerializer } from "../../serializers/restaurant.serializer";

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
): Promise<any> => {
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

  const newSchedule = {
    openTime,
    closingTime,
  };
  const scheduleCreated = schedulesRepository.create({
    ...newSchedule,
    dayWeek: { id: findWeekDay.id },
  });
  await schedulesRepository.save(scheduleCreated);
  return scheduleCreated;
};

export default createNewSchedulesService;
