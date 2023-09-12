import { IUser } from "./user.interfaces";
import { Users } from "./user.model";

const insertIntoDB = async (payload: IUser): Promise<IUser | null> => {
  const result = await Users.create(payload);
  return result;
};
// {
//   "password":"103511",
//   "confirmPassword":"103511",
//   "role":"admin",
//   "name": {
//     "firstName":"Shidul",
//     "middleName":"Islam",
//     "lastName":"Shahin"
//   },
//   "dateOfBirth":"07-11-2000",
//   "gender":"male",
//   "bloodGroup":"A+",
//   "email":"sishahin0931@gamil.com",
//   "contactNo":"017746213000",
//   "emergencyContactNo":"018216664116",
//   "presentAddress": "JhulonPol, Madbarhat, Mirsarai, Chittagong",
//   "permanentAddress": "JhulonPol, Madbarhat, Mirsarai, Chittagong & Bangladesh",
//   "designation":"developer",
//   "profileImage":"https://shahin.png"
// }

export const UserService = {
  insertIntoDB,
};
