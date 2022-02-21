import { prisma } from "./db";

type UserModelType = typeof prisma.user;
type TestModelType = typeof prisma.test;
type SessionModelType = typeof prisma.session;
type LikeModelType = typeof prisma.like;
type UsersRelationModelType = typeof prisma.usersRelation;
type ConversationModelType = typeof prisma.conversation;
type MessageModelType = typeof prisma.message;

export const Test: TestModelType = prisma.test;
export const User: UserModelType = prisma.user;
export const Session: SessionModelType = prisma.session;
export const UserModelType = prisma.user;
export const Like: LikeModelType = prisma.like;
export const UsersRelation: UsersRelationModelType = prisma.usersRelation;
export const Conversation: ConversationModelType = prisma.conversation;
export const Message: MessageModelType = prisma.message;
