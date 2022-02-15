import express, { Request, Response } from "express";
import { getClientIp } from "@supercharge/request-ip/dist";
import { lookup } from "geoip-lite";
import { Test } from "./prisma/models";

const server = express();

server.get("/", async (req: Request, res: Response) => {
  console.log(getClientIp(req));
  //   req.get("user-agent")
  //   console.log(result);
  const tests = await Test.create({ data: { name: "dasj" } });
  console.log("co", tests);
  //   console.log(lookup(getClientIp(req)));
  console.log(lookup("91.124.176.49"));
  res.send("heloo");
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
