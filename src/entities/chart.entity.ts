import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Patient } from "./patient.entity";
import { Psychologist } from "./psychologist.entity";

@Entity("charts")
export class Chart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column()
  description: string;

  @ManyToOne(() => Patient)
  patient: Patient;

  @ManyToOne(() => Psychologist)
  psychologist: Psychologist;
}