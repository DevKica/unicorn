import express, { Request, Response } from "express";

const server = express();

server.get("/", (_: Request, res: Response) => res.json("hello"));

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
