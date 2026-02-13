
export interface IJob {
  _id?: string;
  clientId?: string;
  title: string;
  category: string;
  price: string;
  duration?: string;
  deadline?: string;
  summary: string;
  skill?:string[],
  features?: string[];
  status?: "open" 
  createdAt?: Date;
}
