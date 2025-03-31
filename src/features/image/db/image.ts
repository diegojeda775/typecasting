import { prisma } from "@/lib/prisma";
import { Prisma, Image } from "@prisma/client";
import { revalidateImageCache } from "./cache";

type ImageCreateBody = Prisma.Args<typeof prisma.image, 'create'>['data']
export async function createUser(data: ImageCreateBody) {
  const newImage = await prisma.image.create({
    data
  });
  if (newImage == null) throw new Error("Failed to create image");
  revalidateImageCache(newImage.id)
  return newImage;
}

export async function updateImage(id: string, data: Partial<Image>) {
  const updatedImage = await prisma.image.update({
    data,
    where: {
      id,
    }
  });
  if (updatedImage == null) throw new Error("Failed to update image");
  revalidateImageCache(updatedImage.id)
  return updatedImage;
}
export async function deleteImage(id: string) {
  const [deletedImage] = await prisma.$transaction(async (tx) => {
    const delImage = await prisma.image.update({
      data: {
        deletedAt: new Date(),
        sourceUrl: "deletedImage.com",
      },
      where: {
        id,
      }
    });
    if (deletedImage == null) throw new Error("Failed to delete image");
    await prisma.typeCast.updateMany({
      data: {
        deletedAt: new Date(),
      },
      where: {
        imageId: id,
      }
    });
    return [delImage]
  })

  revalidateImageCache(deletedImage.id)
  return deletedImage;
}