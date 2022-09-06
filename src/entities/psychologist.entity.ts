import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Schedule } from "./schedule.entity";
import { User } from "./user.entity";

@Entity("psychologist")
export class Psychologist {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  emphasis: string;

  @Column()
  experience: string;

  @Column()
  available_times: string;

  @Column("text", {array: true})
  working_days: string[];

  @Column()
  registration: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => Schedule, (schedule) => schedule.psychologist, {
    eager: true,
  })
  schedules: Schedule[];
}
