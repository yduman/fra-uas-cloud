import { Router, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request.error";
import { validateRequest } from "../middlewares/validation.middleware";
import { HashingService, TokenService, UserService } from "../services";
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
    res.send("Hello logout");
  });

  router.post("/api/users/current", (req: Request, res: Response) => {
    res.send("Hello current user");
  });
};
