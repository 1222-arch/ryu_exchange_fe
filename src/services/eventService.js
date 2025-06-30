import { db } from './firebase';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

export const createEventPost = async (data) => {
  const docRef = await addDoc(collection(db, 'eventPosts'), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const fetchEvents = async () => {
  const snapshot = await getDocs(collection(db, 'eventPosts'));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
