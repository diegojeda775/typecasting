import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache"

export function getImageGlobalTag() {
  return getGlobalTag("images");
};

export function getImageIdTag(id: string) {
  return getIdTag("images", id);
};

export function revalidateImageCache(id: string){
  revalidateTag(getImageGlobalTag());
  revalidateTag(getImageIdTag(id));
};