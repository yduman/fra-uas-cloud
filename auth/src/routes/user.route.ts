import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getCurrentUser } from "../middlewares/user-context.middleware";
import { validateRequest } from "../middlewares/validation.middleware";
import { TokenService, UserService } from "../services";
import { validateEmail, validatePassword } from "./validators";

export const userRouter = (router: Router, userService: UserService): void => {
  router.post(
    "/api/users/register",
    [validateEmail(), validatePassword()],
    validateRequest,
    async (req: Request, res: Response) => {
      const { email, password } = req.body;
      await userService.checkDuplicateEmail(email);

      const user = await userService.createUser(email, password);

      const token = TokenService.createToken(user);
      req.session = { jwt: token };
      res.status(201).send(user);
    }
  );

  router.post(
    "/api/users/login",
    [validateEmail(), validatePassword()],
    validateRequest,
    async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const user = await userService.loginUser(email, password);

      const token = TokenService.createToken(user);
      req.session = { jwt: token };
      res.status(200).send(user);
    }
  );

  router.post("/api/users/logout", (req: Request, res: Response) => {
    req.session = null;
    res.send({});
  });

  router.get(
    "/api/users/current",
    getCurrentUser,
    (req: Request, res: Response) => {
      res.send({ currentUser: req.currentUser || null });
    }
  );
};
