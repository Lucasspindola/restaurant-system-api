import AppDataSource from "../../data-source";
import { Restaurant } from "../../entities/restaurant.entity";
const listAllRestaurantsService = async () => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  const allRestaurants = await restaurantRepository
    .createQueryBuilder("restaurant")
    .leftJoinAndSelect("restaurant.typeRestaurant", "typeRestaurant")
    .leftJoinAndSelect("restaurant.daysOfWeek", "dayWeek")
    .leftJoinAndSelect("dayWeek.openingHours", "openingHour")
    .select([
      "typeRestaurant",
      "restaurant.id",
      "restaurant.name",
      "restaurant.email",
      "restaurant.phone",
      "restaurant.document",
      "restaurant.description",
      "restaurant.profileImage",
      "restaurant.createdAt",
      "restaurant.updatedAt",
      "openingHour.openTime",
      "openingHour.closingTime",
    ])
    .getMany();
  return allRestaurants;
};
export default listAllRestaurantsService;
