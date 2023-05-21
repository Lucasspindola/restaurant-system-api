import { hashSync } from "bcryptjs";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { TypeRestaurant } from "./typeRestaurant.entity";
import { DayWeek } from "./daysWeek.entity";

@Entity("Restaurants")
class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  document: string;
  @Column()
  description: string;

  @Column({
    default:
      "https://cdn3.iconfinder.com/data/icons/indian-woman-professions/512/13-512.png",
  })
  profileImage: string | null;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => TypeRestaurant,
    (typeRestaurant) => typeRestaurant.restaurants
  )
  typeRestaurant: TypeRestaurant;

  @ManyToMany(() => DayWeek)
  @JoinTable()
  daysOfWeek: DayWeek[];

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

export { Restaurant };
