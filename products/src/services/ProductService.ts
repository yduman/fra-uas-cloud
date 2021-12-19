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

  async findProductById(productId: string): Promise<ProductDocument | null> {
    return await Product.findById(productId);
  }

  async getAllProducts() {
    return await Product.find({});
  }

  async updateProduct(product: ProductDocument, title: string, price: number) {
    product.set({
      title,
      price,
    });
    await product.save();
  }
}
