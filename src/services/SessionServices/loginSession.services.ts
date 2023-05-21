import { IRestaurantLogin } from "../../interfaces/restaurants";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Restaurant } from "../../entities/restaurant.entity";
import { AppError } from "../../errors/AppError";
import "dotenv/config";

const loginSessionService = async ({
  email,
  password,
}: IRestaurantLogin): Promise<string> => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  const restaurant = await restaurantRepository.findOne({
    where: { email: email },
    withDeleted: true,
  });

  if (!restaurant) {
    throw new AppError(403, "user or password invalid");
  }

  const passwordCombined = await compare(password, restaurant.password);

  if (!passwordCombined) {
    throw new AppError(403, "user or password invalid");
  }

  const token = jwt.sign({}, process.env.SECRET_KEY!, {
    subject: String(restaurant.id),
    expiresIn: "24h",
  });

  return token;
};

export default loginSessionService;
