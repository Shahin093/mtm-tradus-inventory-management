import { IStore } from "./store.interface";
import { Store } from "./store.model";

// {
//   "name":"chattogram",
// "status":"active",
// "manager":"64ff5d72f2abea436b0ecb68"
// }
const insertInToDB = async (payload: IStore): Promise<IStore> => {
  const result = await Store.create(payload);
  return result;
};

export const StoreService = {
  insertInToDB,
};
