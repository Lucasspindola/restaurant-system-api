export interface INewRestaurantRequest {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  document: string;
  description: string;
  password: string;
  typeRestaurant?: string;
}

export interface IRestaurantLogin {
  email: string;
  password: string;
}
