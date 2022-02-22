import {
  ConversationModelType,
  LikeModelType,
  MessageModelType,
  SessionModelType,
  TestModelType,
  UserModelType,
  UsersRelationModelType,
} from "../@types/prisma/models.types";
import { prisma } from "./db";

export const TestModel: TestModelType = prisma.test;
export const UserModel: UserModelType = prisma.user;
export const SessionModel: SessionModelType = prisma.session;
export const LikeModel: LikeModelType = prisma.like;
export const UsersRelationModel: UsersRelationModelType = prisma.usersRelation;
export const ConversationModel: ConversationModelType = prisma.conversation;
export const MessageModel: MessageModelType = prisma.message;
