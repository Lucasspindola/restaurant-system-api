import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity("TypeRestaurants")
class TypeRestaurant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
  @OneToMany(() => Restaurant, (restaurant) => restaurant.typeRestaurant)
  restaurants: Restaurant[];
}

export { TypeRestaurant };
