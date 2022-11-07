
interface IUser {
  userId: string;
  email: string;
  verified?: boolean;
  role: "vendor" | "customer" | "HiTable";
  verifiedAt?: Date;
}
declare namespace Express {
  export interface Request {
    user?: IUser;
  }
  export interface Response {
    user?: IUser;
  }
}

interface MyContext {
  req: Express.Request;
  res: Express.Response;
}
