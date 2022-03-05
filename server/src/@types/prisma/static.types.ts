import { Prisma } from "@prisma/client";
import type { PasswordReset, User, Session, EmailVerification } from "@prisma/client";

// User
export type UserType = User;
export type UserCreateInput = Prisma.UserCreateInput;
export type UserWhereUniqueInput = Prisma.UserWhereUniqueInput;
export type UserWhereInput = Prisma.UserWhereInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
export type UserSelectType = Prisma.UserSelect;

// Session
export type SessionType = Session;
export type SessionCreateInput = Prisma.SessionCreateInput;
export type SessionWhereUniqueInput = Prisma.SessionWhereUniqueInput;
export type SessionWhereInput = Prisma.SessionWhereInput;

// EmailVerification
export type EmailVerificationType = EmailVerification;
export type EmailVerificationCreateInput = Prisma.EmailVerificationCreateInput;
export type EmailVerificationWhereUniqueInput = Prisma.EmailVerificationWhereUniqueInput;

// PasswordReset
export type PasswordResetType = PasswordReset;
export type PasswordResetCreateInput = Prisma.PasswordResetCreateInput;
export type PasswordResetWhereUniqueInput = Prisma.PasswordResetWhereUniqueInput;
