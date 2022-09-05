import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCuFWdVqDst82mVTtI2L9etw9HcwIDxrTU",
    authDomain: "crwn-clothing-db-2ebb5.firebaseapp.com",
    projectId: "crwn-clothing-db-2ebb5",
    storageBucket: "crwn-clothing-db-2ebb5.appspot.com",
    messagingSenderId: "343408135832",
    appId: "1:343408135832:web:6aaf1a1bab630d4f78caed"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect (auth, provider);
  export const db = getFirestore();

  export const creatUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocrRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocrRef);

    if(!userSnapshot.exists()){
      const { displayName, email } = userAuth;
      const createdAt =  new Date();

      try{
        await setDoc(userDocrRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        })
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    return userDocrRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }