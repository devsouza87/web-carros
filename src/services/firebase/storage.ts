import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebaseConnection";

export async function uploadImage(
  file: File,
  userUid: string,
  uidImage: string,
) {
  const uploadRef = ref(storage, `images/${userUid}/${uidImage}`);

  const snapshot = await uploadBytes(uploadRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);

  return {
    uid: userUid,
    name: uidImage,
    url: downloadUrl,
  };
}

export async function deleteImage(name: string, userUid: string) {
  const imagePath = `images/${userUid}/${name}`;
  const imageRef = ref(storage, imagePath);
  await deleteObject(imageRef);
}
