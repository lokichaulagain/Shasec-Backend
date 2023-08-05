import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import IMessage from "../model/message.model";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class MessageEntity implements IMessage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  content!: string;

  @Column({ default: () => `CURRENT_TIMESTAMP + INTERVAL '3 days'` })
  expirationDate!: string;

  @Column()
  password?: string;

  @Column({ default: new Date().toDateString() })
  createdAt!: string;

  // Constructor to generate UUID for the ID property when a new instance is created
  constructor() {
    this.id = uuidv4();
  }
}
