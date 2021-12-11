import { Product, ProductDocument } from "../models/product.model";

export class ProductService {
  async createProduct(
    title: string,
    price: number,
    userId: string
  ): Promise<ProductDocument> {
    const product = Product.build({ title, price, userId });
    await product.save();
    return product;
  }
}
