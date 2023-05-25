import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { DayWeek } from "./daysWeek.entity";
import { Restaurant } from "./restaurant.entity";

@Entity("OpeningHours")
class OpeningHour {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  openTime: string;
  @Column()
  closingTime: string;

  @ManyToOne(() => DayWeek, (dayWeek) => dayWeek.openingHours)
  dayWeek: DayWeek;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.openingHours)
  restaurant: Restaurant;
}

export { OpeningHour };
