import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { DayWeek } from "./daysWeek.entity";

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
}

export { OpeningHour };
