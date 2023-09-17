import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const insertIntoDB = async (payload: IProduct): Promise<IProduct> => {
  const result = (await Product.create(payload)).populate("brand");

  return result;
};

export const ProductService = {
  insertIntoDB,
};
