import { IStock } from "./stock.interface";
import { Stock } from "./stock.model";

// {
//   "productId":"65068a3b061412e31585e7ac",
//   "store":"650930b4eb82587724c912b0",
//   "name":"CIMENT",
//   "description": "it is very helpfull for us",
//   "unit":"KG",
//   "imageURL":"https://shain.jpg",
//   "price": 670,
//   "quantity":50,
//   "status": "in-stock",
//   "suppliedBy": "650299d5b8211a408dbdd56d",
//   "category":"Big saller",
//   "brand":"65068a04ec5011a0b8354295"

// }
const insertIntoDB = async (payload: IStock): Promise<IStock> => {
  const result = (
    await (
      await (
        await (await Stock.create(payload)).populate("brand")
      ).populate("suppliedBy")
    ).populate("productId")
  ).populate("store");

  return result;
};

export const StockService = {
  insertIntoDB,
};
