import { prisma } from "../../prisma/db";

export type UserModelType = typeof prisma.user;
export type SessionModelType = typeof prisma.session;
export type LikeModelType = typeof prisma.like;
export type UsersRelationModelType = typeof prisma.usersRelation;
export type ConversationModelType = typeof prisma.conversation;
export type MessageModelType = typeof prisma.message;
export type EmailVerificationModelType = typeof prisma.emailVerification;
export type PasswordResetModelType = typeof prisma.passwordReset;
export type PremiumAccountTokenModelType = typeof prisma.premiumAccountToken;
