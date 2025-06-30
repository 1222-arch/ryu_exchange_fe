import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export const uploadImages = async (files) => {
  const uploadPromises = [...files].map(async (file) => {
    const storageRef = ref(storage, `spotImages/${file.name}-${Date.now()}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  });

  return Promise.all(uploadPromises);
};
