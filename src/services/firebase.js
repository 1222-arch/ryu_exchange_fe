
import { initializeApp } from "firebase/app";
 import { getAuth,
       
        signInWithPopup,
        GoogleAuthProvider,
        signInWithEmailAndPassword,
 } from "firebase/auth";
 import { getDoc, getFirestore ,doc,setDoc} from "firebase/firestore";
 import { createUserWithEmailAndPassword } from "firebase/auth";
 import { getStorage } from "firebase/storage";

 // Thêm hàm này nếu dùng ở SignUp
 export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;
   return await createUserWithEmailAndPassword(auth, email, password);
 };
 


 const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  

 const app = initializeApp(firebaseConfig);
 const provider = new GoogleAuthProvider();

 provider.setCustomParameters({
        prompt:'select_account',
 });
 export const storage = getStorage(app);
 export const auth= getAuth(app);
 export const signInWithGooglePopup=()=> signInWithPopup(auth, provider)
 export const db = getFirestore(app)
 export const googleProvider = provider;

 export const signInAuthUserWithEmailAndPassword = async (email, password) => {
       return await signInWithEmailAndPassword(auth, email, password);
     };

 export const createUserDocumentFromAuth = async(userAuth)=>{
        const userDocRef = doc(db,'users',userAuth.uid);
        const  userSnapshot = await getDoc(userDocRef);
        if(!userSnapshot.exists()){
            const{displayName,email}= userAuth;
            const createdAt = new Date();
            try{
                await setDoc(userDocRef,{
                        displayName,
                        email,
                        createdAt,
                        role: 'user',
                });
            }catch(error){
                console.log('error creating the user', error)
            }
            
        }
        return userDocRef
 }