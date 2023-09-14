import { IGenericErrorMessage } from "./error";

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMassages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  // toObject: any;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
