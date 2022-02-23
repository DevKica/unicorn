import { Prisma } from "@prisma/client";
import type { User, Session, EmailVerification } from "@prisma/client";

// User
export type UserType = User;
export type UserCreateInput = Prisma.UserCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
export type UserSelectType = Prisma.UserSelect;

// Session
export type SessionType = Session;
export type SessionCreateInput = Prisma.SessionCreateInput;

// EmailVerification
export type EmailVerificationType = EmailVerification;
export type EmailVerificationCreateInput = Prisma.EmailVerificationCreateInput;
