import { getUserTag } from "@/lib/dataCache";
import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

const client = await clerkClient();

export type CurrentAuthUser = Awaited<ReturnType<typeof getCurrentUser>>
export async function getCurrentUser({allData = false} = {}) {
  const {userId, sessionClaims, redirectToSignIn} = await auth()

  return {
    externalId: userId,
    userId: sessionClaims?.dbId,
    role: sessionClaims?.role,
    user:
      allData && sessionClaims?.dbId != null ? await getUser(sessionClaims.dbId) : undefined,
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

async function getUser(id: string){
  "use cache"
  cacheTag(getUserTag("users",id))

  return prisma.user.findUnique({
    where: { id }
  })
}