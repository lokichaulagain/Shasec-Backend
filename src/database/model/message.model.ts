export default interface IMessage {
  id: string;
  content: string;
  expirationDate?: string;
  password?: string;
  createdAt: string;
}
