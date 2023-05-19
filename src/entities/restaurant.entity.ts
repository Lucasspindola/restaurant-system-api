import { hashSync } from "bcryptjs";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  DeleteDateColumn,
  BeforeUpdate,
  OneToMany,
} from "typeorm";

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

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

export { Restaurant };
