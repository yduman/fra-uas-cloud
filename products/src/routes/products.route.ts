import { Router, Request, Response } from "express";
import { ForbiddenError } from "../errors/forbidden.error";
import { NotFoundError } from "../errors/not-found.error";
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
    async (req: Request, res: Response) => {
      const { title, price } = req.body;
      const userId = req.currentUser!.id;
      const product = await productService.createProduct(title, price, userId);
      res.status(201).send(product);
    }
  );

  router.get("/api/products/:id", async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await productService.findProductById(productId);
    if (!product) throw new NotFoundError();
    res.send(product);
  });

  router.get("/api/products", async (req: Request, res: Response) => {
    const products = await productService.getAllProducts();
    res.send(products);
  });

  router.put(
    "/api/products/:id",
    useAuth,
    [validateTitle(), validatePrice()],
    validateRequest,
    async (req: Request, res: Response) => {
      const productId = req.params.id;
      const { title, price } = req.body;

      const product = await productService.findProductById(productId);
      if (!product) throw new NotFoundError();
      if (product.userId !== req.currentUser!.id) throw new ForbiddenError();

      await productService.updateProduct(product, title, price);
      res.send(product);
    }
  );
};
