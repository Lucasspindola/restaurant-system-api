import AppDataSource from "../../data-source";
import { DayWeek } from "../../entities/daysWeek.entity";
import { Restaurant } from "../../entities/restaurant.entity";
import { AppError } from "../../errors/AppError";

const viewOfRestaurantByIdService = async (restaurantId) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  let findRestaurant = await restaurantRepository.find({
    where: { id: restaurantId },
  });
  if (!findRestaurant) {
    throw new AppError(404, "Restaurant does not exist in the database");
  }
  const dayWeekRepository = AppDataSource.getRepository(DayWeek);
  const dayWeeks = await dayWeekRepository.find({
    where: { openingHours: { restaurant: { id: restaurantId } } },
    relations: ["openingHours"],
  });

  findRestaurant[0].daysOfWeek = dayWeeks;

  return findRestaurant;
};

export default viewOfRestaurantByIdService;
