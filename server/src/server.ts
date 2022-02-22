import express, { Request, Response } from "express";
import appMainRoutes from "./routes/app.main.routes";
import { createUserSchema } from "./validation/user.schemas";
import { emailToLowerCase } from "./middleware/emailToLowerCase";
import { schemaValidation } from "./middleware/schemaValidation";

const server = express();

server.get("/", async (req: Request, res: Response) => {
  // console.log(getClientIp(req));
  // const result = req.get("user-agent");
  // console.log(lookup(getClientIp(req) || ""));
  // console.log(lookup("91.124.176.49"));

  res.json(
    schemaValidation(createUserSchema, {
      name: "sp",
      surname: "ex",
      email: "devKica777@gmail.com",
      password: "sS!pace11/11111x",
      passwordRepetition: "sS!pace1111111x",
      birthday: "2002-02-02",
      gender: "male",
      sexualOrientation: ["Lesbian"],
    })
  );
  // res.json("12");
});

server.use(emailToLowerCase);

server.use("/api/v1", appMainRoutes);

// server.get("/create", async (_: Request, res: Response) => {
//   try {
//     const date = new Date("2020-01-05");
//     const data = await TestTime.create({ data: { birthday: date } });
//     const heh = await TestTime.findMany({
//       where: {
//         birthday: {
//           gte: new Date("2020-01-01"),
//           lt: new Date("2020-01-06"),
//         },
//       },
//     });
//     console.log(heh);
//     console.log(data);
//     res.json(data);
//   } catch (e) {
//     logError(e);
//   }
// });

export default server;
