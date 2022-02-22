import { Prisma } from "@prisma/client";
import type { User, Session } from "@prisma/client";

// User
export type UserType = User;
export type UserCreateInput = Prisma.UserCreateInput;

// Session
export type SessionType = Session;
export type SessionCreateInput = Prisma.SessionCreateManyInput;
