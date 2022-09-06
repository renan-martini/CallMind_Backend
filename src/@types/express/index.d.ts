import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        type: string;
        userName: string;
        first_login: boolean;
        isActive: boolean;
      };
    }
  }
}
