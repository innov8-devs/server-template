import { IUser } from './index';

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
