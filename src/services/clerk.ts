import { clerkClient } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";

const client = await clerkClient();

export async function syncClerkUserMetadata(user: {
  id: string
  externalId: string
  role: UserRole
}) {
  client.users.updateUserMetadata(user.externalId, {
    publicMetadata: {
      dbId: user.id,
      role: user.role,
    }
  })
}