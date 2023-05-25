export interface INewSchedule {
  dayWeek: string;
  openTime: string;
  closingTime: string;
}
export interface IUpdatedSchedule {
  openTime: string;
  closingTime: string;
}

export interface IResponseNewSchedule {
  openTime: string;
  closingTime: string;
  dayWeek: {
    id: string;
  };
  id: string;
}

export interface IRequestIsOpen {
  date: string;
  hour: string;
  restaurantId: string;
}
