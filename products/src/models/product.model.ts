import mongoose from "mongoose";

interface ProductProps {
  title: string;
  price: number;
  userId: string;
}

interface ProductModel extends mongoose.Model<ProductDocument> {
  build(props: ProductProps): ProductDocument;
}

export interface ProductDocument extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

productSchema.statics.build = (props: ProductProps) => {
  return new Product(props);
};

export const Product = mongoose.model<ProductDocument, ProductModel>(
  "Product",
  productSchema
);
