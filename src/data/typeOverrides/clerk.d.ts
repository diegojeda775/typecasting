import { UserRole } from "@prisma/client";

export {}

declare global {
  interface CustomJwtSessionClaims {
    dbId?: string
    role?: UserRole
  }

  interface UserPublicMetadata {
    dbId?: string
    role?: UserRole
  }
}