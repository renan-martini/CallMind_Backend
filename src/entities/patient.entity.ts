import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Chart } from "./chart.entity";
import { Schedule } from "./schedule.entity";
import { User } from "./user.entity";

@Entity("patient")
export class Patient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  age: number;

  @Column()
  status: string;

  @Column()
  schooling: string;

  @Column()
  profession: string;

  @Column()
  complaint: string;

  @Column()
  medication: string;

  @Column()
  disease: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => Schedule, (schedule) => schedule.patient, { eager: true })
  schedules: Schedule[];

  @OneToMany(() => Chart, (chart) => chart.patient, { eager: true })
  chart: Chart[];
}
