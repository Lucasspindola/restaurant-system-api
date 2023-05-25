import AppDataSource from "../../data-source";
import { DayWeek } from "../../entities/daysWeek.entity";
const listAllRestaurantsService = async () => {
  const dayWeekRepository = AppDataSource.getRepository(DayWeek);
  const dayWeeks = await dayWeekRepository.find({
    where: { openingHours: { restaurant: {} } },
    relations: ["restaurant", "openingHours"],
  });
  return dayWeeks;
};

export default listAllRestaurantsService;
