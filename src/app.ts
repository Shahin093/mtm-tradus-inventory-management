import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
// testing
app.get("/", (req: Request, res: Response) => {
  res.send("Working Successfully");
});
export default app;
