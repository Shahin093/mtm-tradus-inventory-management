import { ISupplier } from "./supplier.interface";
import { Supplier } from "./supplier.model";

// {
//   "name":"Raju",
//   "email":"raju@gamil.com",
//   "contactNumber":"0199384434",
//   "emergencyContactNumber":"837483748",
//   "tradeLicenseNumber":8875,
//   "presentAddress":"jhulon",
//   "permanentAddress":"Dhaka",
//   "location": "Dhaka",
//   "imageURL":"https://shahin.png",
//   "nationalIdImageURL":"https://shahin.png",
//   "status":"active"
//   }
const insertIntoDB = async (payload: ISupplier): Promise<ISupplier> => {
  const result = await Supplier.create(payload);

  return result;
};

export const SupplierService = {
  insertIntoDB,
};
