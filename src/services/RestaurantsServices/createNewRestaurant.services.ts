import AppDataSource from "../../data-source";
import { Restaurant } from "../../entities/restaurant.entity";
import { TypeRestaurant } from "../../entities/typeRestaurant.entity";
import { AppError } from "../../errors/AppError";
import { restaurantWithoutPasswordFieldSerializer } from "../../serializers/restaurant.serializer";

const createNewRestaurantService = async (
  dataRestaurant: any
): Promise<any> => {
  const restaurantsRepository = AppDataSource.getRepository(Restaurant);
  const typeRestaurantRepository = AppDataSource.getRepository(TypeRestaurant);

  const findRestaurant = await restaurantsRepository.findOne({
    where: { email: dataRestaurant.email },
    withDeleted: true,
  });
  if (findRestaurant) {
    throw new AppError(409, "Restaurant with this email already registered");
  }

  let findTypeRestaurant = await typeRestaurantRepository.findOne({
    where: { name: dataRestaurant.typeRestaurant },
    withDeleted: true,
  });

  if (!findTypeRestaurant) {
    findTypeRestaurant = typeRestaurantRepository.create({
      name: dataRestaurant.typeRestaurant,
    });

    await typeRestaurantRepository.save(findTypeRestaurant);
  }

  const { name, email, password, document, phone, description, profileImage } =
    dataRestaurant;
  const newRestaurant = {
    name,
    email,
    password,
    document,
    phone,
    description,
    profileImage,
  };
  const restaurantCreated = restaurantsRepository.create({
    ...newRestaurant,
    typeRestaurant: { id: findTypeRestaurant.id },
  });
  await restaurantsRepository.save(restaurantCreated);
  const restaurantWithoutPasswordField =
    restaurantWithoutPasswordFieldSerializer.validate(restaurantCreated, {
      stripUnknown: true,
    });

  return restaurantWithoutPasswordField;
};

export default createNewRestaurantService;
