import { Router, Request, Response } from "express";
import { useTypeORM } from "../database/typeorm";
import { MessageEntity } from "../database/entity/message.entity";
import bcrypt from "bcrypt";

const controller = Router();

controller

  .post("/", async (req: Request, res: Response) => {
    const message = new MessageEntity();
    message.message = req.body.message;
    message.expirationDate = req.body.expirationDate || undefined;
    // Check if the password exists before hashing it
    if (req.body.password) {
      message.password = bcrypt.hashSync(req.body.password, 10);
    } else {
      message.password = req.body.password !== undefined ? req.body.password : "";
    }

    const newMessage = await useTypeORM(MessageEntity).save(message);
    res.status(201).send({
      success: true,
      message: "Message Ccrested successfully",
      id:newMessage.id
    });
  })

  .get("/", async (req: Request, res: Response) => {
    const messages = await useTypeORM(MessageEntity).find();
    res.send(messages);
  })

  .get("/count", async (req: Request, res: Response) => {
    const messageCount = await useTypeORM(MessageEntity).count();
    res.send({ count: messageCount });
  })

  .get("/:id/:password?", async (req: Request, res: Response) => {
    const { id, password } = req.params;
    console.log(id, password);

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingMessage = await useTypeORM(MessageEntity).findOneBy({ id });

    if (!existingMessage) {
      return res.status(404).send({ message: `Message with id: ${id} was not found.` });
    }

    if (existingMessage.password && !password) {
      return res.status(401).send({ message: `Password is required to access this message.` });
    }

    if (existingMessage.password && password) {
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, existingMessage.password);

      if (!isPasswordValid) {
        return res.status(401).send({ message: `Invalid password for message with id: ${id}.` });
      }
    }

    // If password check passed, send the message data
  
    res.status(200).send({
      success: true,
      message: "Message Ccrested successfully",
      data:existingMessage
    });
  })

  .patch("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingMessage = await useTypeORM(MessageEntity).findOneBy({ id });

    if (!existingMessage) {
      return res.status(404).send({ message: `Message with id: ${id} was not found.` });
    }

    const changes: Partial<MessageEntity> = req.body;
    const messageChanges = { ...existingMessage, ...changes };

    const updatedMessage = await useTypeORM(MessageEntity).save(messageChanges);
    res.send(updatedMessage);
  })

  .delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingMessage = await useTypeORM(MessageEntity).findOneBy({ id });

    if (!existingMessage) {
      return res.status(404).send({ message: `Messaage with id: ${id} was not found.` });
    }

    await useTypeORM(MessageEntity).remove(existingMessage);
    res.send({ message: "Message removed!" });
  });

export default controller;
