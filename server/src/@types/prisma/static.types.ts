import { Prisma } from "@prisma/client";
import type { PasswordReset, User, Session, EmailVerification } from "@prisma/client";

// User
export type UserType = User;
export type UserCreateInput = Prisma.UserCreateInput;
export type UserWhereUniqueInput = Prisma.UserWhereUniqueInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
export type UserSelectType = Prisma.UserSelect;

// Session
export type SessionType = Session;
export type SessionCreateInput = Prisma.SessionCreateInput;
export type SessionFindUniqueInput = Prisma.SessionWhereUniqueInput;

// EmailVerification
export type EmailVerificationType = EmailVerification;
export type EmailVerificationCreateInput = Prisma.EmailVerificationCreateInput;
export type EmailVerificationWhereUniqueInput = Prisma.EmailVerificationWhereUniqueInput;

// PasswordReset
export type PasswordResetType = PasswordReset;
