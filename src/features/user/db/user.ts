import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
type UserButtonCreateBody = Prisma.Args<typeof prisma.user, 'create'>['data']
export async function createUser(data: UserButtonCreateBody) {
  const newUser = await prisma.user.create({
    data
  });
  if (newUser == null) throw new Error("Failed to create user");
  return newUser;
}

export async function updateUser(externalId: string, data: Partial<User>) {
  const updatedUser = await prisma.user.update({
    data,
    where: {
      externalId,
    }
  });
  if (updatedUser == null) throw new Error("Failed to update user");
  return updatedUser;
}
export async function deleteUser(externalId: string) {
  const deletedUser = await prisma.user.update({
    data: {
      deletedAt: new Date(),
      avatar: null,
      email: "redated@deleted.com",
      externalId: "Deleted clerkId",
      name: "Deleted User",
      username: "Deleted Username",
    },
    where: {
      externalId,
    }
  });
  if (deletedUser == null) throw new Error("Failed to delete user");
  return deletedUser;
}