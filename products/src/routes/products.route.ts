import { Router, Request, Response } from "express";
import { useAuth } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validation.middleware";
import { ProductService } from "../services/ProductService";
import { validatePrice, validateTitle } from "./validators";

export const productsRouter = (
  router: Router,
  productService: ProductService
): void => {
  router.post(
    "/api/products",
    useAuth,
    [validateTitle(), validatePrice()],
    validateRequest,
    (req: Request, res: Response) => {
      const { title, price } = req.body;
      const userId = req.currentUser!.id;
      const product = productService.createProduct(title, price, userId);

      res.status(201).send(product);
    }
  );
};
