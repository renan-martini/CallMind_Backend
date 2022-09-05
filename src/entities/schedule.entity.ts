import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Patient } from "./patient.entity";
import { Psychologist } from "./psychologist.entity";

@Entity("schedules")
export class Schedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @Column({ default: true })
  available: boolean;

  @Column()
  link: string;

  @ManyToOne(() => Patient)
  patient: Patient;

  @ManyToOne(() => Psychologist)
  psychologist: Psychologist;
}
