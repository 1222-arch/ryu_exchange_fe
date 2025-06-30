import { db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const createSpotPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, 'spotPosts'), {
      ...postData,
      createdAt: serverTimestamp(),
      status: 'pending' // nếu muốn duyệt bài như exchange
    });
    return docRef.id;
  } catch (err) {
    console.error('Error adding spot post:', err);
    throw err;
  }
};
