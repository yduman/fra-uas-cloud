import { Router, Request, Response } from "express";
import {
  RequestValidationService,
  TokenService,
  UserService,
} from "../services";
import { validateEmail, validatePassword } from "./validators";

export const userRouter = (router: Router, userService: UserService): void => {
  router.post(
    "/api/users/register",
    [validateEmail(), validatePassword()],
    async (req: Request, res: Response) => {
      RequestValidationService.validateBody(req);
      const { email, password } = req.body;

      await userService.checkDuplicateEmail(email);
      const user = await userService.createUser(email, password);
      const token = TokenService.createToken(user);

      req.session = { jwt: token };
      res.status(201).send(user);
    }
  );

  router.post("/api/users/login", (req: Request, res: Response) => {
    res.send("Hello login");
  });

  router.post("/api/users/logout", (req: Request, res: Response) => {
    res.send("Hello logout");
  });

  router.post("/api/users/current", (req: Request, res: Response) => {
    res.send("Hello current user");
  });
};
