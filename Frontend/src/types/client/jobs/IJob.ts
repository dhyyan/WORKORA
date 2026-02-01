export interface IJob {
  _id?: string;
  clientId?: string;
  title: string;
  category: string;
  price: string;
  duration?: string;
  deadline?: string;
  summary: string;
  features?: string[];
  status?: "open" 
  createdAt?: Date;
}
