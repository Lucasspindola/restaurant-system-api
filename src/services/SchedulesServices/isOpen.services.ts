import AppDataSource from "../../data-source";
import { OpeningHour } from "../../entities/openingHours.entity";
import { AppError } from "../../errors/AppError";
import { IRequestIsOpen } from "../../interfaces/shedules";

const isOpenService = async (data: IRequestIsOpen): Promise<{}> => {
  const { restaurantId, hour, date } = data;
  const schedulesRepository = AppDataSource.getRepository(OpeningHour);
  const findSchedules = await schedulesRepository.find({
    where: { restaurant: { id: restaurantId } },
    relations: ["dayWeek"],
  });

  if (findSchedules.length === 0) {
    return { message: "Not open today!" };
  }

  const [day, month, year] = date.split("/").map(Number);
  const dateBody = new Date(year, month - 1, day);
  const dayOfWeekRequest = dateBody.getDay();

  const dayOfWeekNames = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];

  const dayOfWeekToSearch = dayOfWeekNames[dayOfWeekRequest];

  const matchingObjects = findSchedules.filter((item) => {
    return (
      item.dayWeek.dayWeek.toLowerCase() === dayOfWeekToSearch.toLowerCase()
    );
  });

  if (matchingObjects.length === 0) {
    return { message: "Not open today!" };
  }

  for (const openingHour of matchingObjects) {
    const isOpen = checkOpen(openingHour, hour);
    if (isOpen) {
      return { message: `Está aberto. Fecha às ${openingHour.closingTime}.` };
    }
  }

  return "Fechado.";

  function checkOpen(openingHour: OpeningHour, currentHour: string): boolean {
    const openingTime = new Date(`1970-01-01T${openingHour.openTime}:00`);
    const closingTime = new Date(`1970-01-01T${openingHour.closingTime}:00`);
    const currentTime = new Date(`1970-01-01T${currentHour}:00`);

    return currentTime >= openingTime && currentTime <= closingTime;
  }
};

export default isOpenService;
