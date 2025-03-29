import { UserRole } from "@prisma/client";

export function canAccessAdminPages({ role }: {role: UserRole | undefined}) {
  return role === "ADMIN"
}