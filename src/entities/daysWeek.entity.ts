import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Restaurant } from "./restaurant.entity";
import { OpeningHour } from "./openingHours.entity";

@Entity("DaysWeek")
class DayWeek {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  dayWeek: string;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.daysOfWeek)
  restaurant: Restaurant;

  @OneToMany(() => OpeningHour, (openingHour) => openingHour.dayWeek, {
    cascade: true,
  })
  openingHours: OpeningHour[];
}

export { DayWeek };
