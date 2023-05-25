import AppDataSource from "../../data-source";
import { Restaurant } from "../../entities/restaurant.entity";

const listAllRestaurantsService = async () => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  const restaurants = await restaurantRepository
    .createQueryBuilder("restaurant")
    .leftJoinAndSelect("restaurant.typeRestaurant", "typeRestaurant")
    .select([
      "restaurant.id",
      "restaurant.name",
      "restaurant.email",
      "restaurant.phone",
      "restaurant.document",
      "restaurant.description",
      "restaurant.profileImage",
      "restaurant.createdAt",
      "restaurant.updatedAt",
      "typeRestaurant",
    ])
    .getMany();

  return restaurants;
};

export default listAllRestaurantsService;
