import { NextFunction, Request, Response } from 'express';
import { User } from './user';

export type Controller<T = Request> = (
    req: T,
    res: Response,
    next: NextFunction
  ) => void;

export type JWToken = {
  exp: number;
  user: User;
}

export type AuthPredicate<T = Request> = (req: T) => boolean;