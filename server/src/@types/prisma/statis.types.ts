import { Prisma } from "@prisma/client";
import type { User, Session } from "@prisma/client";

export type UserCreateInput = Prisma.UserCreateInput;
export type UserType = User;
export type SessionType = Session;
