import express, { Request, Response } from "express";
import { getClientIp } from "@supercharge/request-ip/dist";
import { lookup } from "geoip-lite";
import { Test } from "./prisma/models";
import appMainRouter from "./routes/appMainRouter";
import { testSchemaMethod } from "./validation/userSchema";
import { checkIfAlphabetical } from "./validation/helpers";

const server = express();

server.use(appMainRouter);

server.get("/", async (req: Request, res: Response) => {
  console.log(getClientIp(req));
  const result = req.get("user-agent");
  console.log(result);
  const tests = await Test.findMany();
  console.log("co", tests);
  console.log(lookup(getClientIp(req) || ""));
  console.log(lookup("91.124.176.49"));
  res.send("heloo");

  console.log(checkIfAlphabetical("沙沙 dsa dsa22 1 1313 "));
  console.log(checkIfAlphabetical("321321111dsadsa"));
  console.log(checkIfAlphabetical("dsadsadsadsadsa "));

  console.log(testSchemaMethod.validate({ name: "  dsadsadsdsadsa    " }, { abortEarly: false }));
});

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
