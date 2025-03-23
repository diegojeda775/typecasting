import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function onUserLogin() {
  try {
    const extUser = await currentUser();
    const userId = extUser?.id;
    if(!extUser || !userId) return;
    const foundUser = await prisma.user.findUnique({
      where: {
        externalId: userId,
      }
    })
    if(foundUser) return foundUser;

    const dbUser = await prisma.user.create({
      data: {
        externalId: userId,
        name: `${extUser.firstName || ""} ${extUser.lastName || ""}`,
        username: extUser.username ?? extUser.emailAddresses[0].emailAddress.split("@")[0],
        email: extUser.emailAddresses[0].emailAddress,
        avatar: extUser.imageUrl,
      },
    });

    if(!dbUser) throw new Error("User Not Created")

    return dbUser;
  } catch (error) {
    console.log('Error', error)
  }
}