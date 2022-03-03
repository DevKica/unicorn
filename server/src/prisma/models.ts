import {
    ConversationModelType,
    EmailVerificationModelType,
    LikeModelType,
    MessageModelType,
    PasswordResetModelType,
    PremiumUserModelType,
    SessionModelType,
    UserModelType,
    UsersRelationModelType,
} from "../@types/prisma/models.types";
import { prisma } from "./db";

export const UserModel: UserModelType = prisma.user;
export const SessionModel: SessionModelType = prisma.session;
export const LikeModel: LikeModelType = prisma.like;
export const UsersRelationModel: UsersRelationModelType = prisma.usersRelation;
export const ConversationModel: ConversationModelType = prisma.conversation;
export const MessageModel: MessageModelType = prisma.message;
export const EmailVerificationModel: EmailVerificationModelType = prisma.emailVerification;
export const PasswordResetModel: PasswordResetModelType = prisma.passwordReset;
export const PremiumUserModel: PremiumUserModelType = prisma.premiumUser;
