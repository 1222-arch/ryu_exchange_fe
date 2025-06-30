import { db } from "./firebase";
import { addDoc ,collection, serverTimestamp} from "firebase/firestore";


export const createExchangePost = async (postData) => {
    try {
      const docRef = await addDoc(collection(db, 'exchangePosts'), {
        ...postData,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.error('Error adding post:', err);
      throw err;
    }
  };