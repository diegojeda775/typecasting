import { auth, clerkClient } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";

const client = await clerkClient();

export async function getCurrentUser() {
  const {userId, sessionClaims, redirectToSignIn} = await auth()

  return {
    externalId: userId,
    userId: sessionClaims?.dbId,
    role: sessionClaims?.role,
    redirectToSignIn,
  }
}

export function syncClerkUserMetadata(user: {
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