import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./app/routes";
import httpStatus from "http-status";
const app: Application = express();
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// users route
// app.use('/api/v1/users/', UserRoutes);
// // academic semester route
// app.use('/api/v1/academicSemester', AcademicSemesterRoutes);
app.use("/api/v1", routes);

// testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
//   // Promise.reject(new Error('Unhandled Promise Rejection.'))
//   //   res.send('Working Successfully')
//   //   throw new ApiError(400, 'ore baba error')
//   // next('Ore babure koto boro error') // Error
// })

// global error handler
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMassages: [
      {
        path: req.originalUrl,
        message: "Api Not Found",
      },
    ],
  });
  next();
});

// const testIds = async (): Promise<void> => {
//   const testId = await generateFaculty();
//   console.log(testId);
// };

// testIds();

export default app;
