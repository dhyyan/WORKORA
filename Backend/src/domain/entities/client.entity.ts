export interface Client {
  _id?: string;

  name: string;
  email: string;

  password?: string;               
  googleId?: string;               
  authProvider: "local" | "google"; 

  phone?: string;
  role: "client" | "admin";                  
  profileImage?: string;

  isBlocked?: boolean;
  isSubscribed?: boolean;

  createdAt?: Date;
}