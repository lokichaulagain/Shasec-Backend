export default interface IMessage {
  id: string;
  message: string;
  expirationDate?: string;
  password?: string;
  createdAt: string;
}
