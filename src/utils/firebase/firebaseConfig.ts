import {
  getAuth,
  NextOrObserver,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getDoc, doc, setDoc, getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCJMxHpjT6EbAp14p23HvTFrTB-hBUZ0r4",
  authDomain: "clothing-store-e9cd4.firebaseapp.com",
  projectId: "clothing-store-e9cd4",
  storageBucket: "clothing-store-e9cd4.appspot.com",
  messagingSenderId: "922788092015",
  appId: "1:922788092015:web:17dc17939b0fb32d0a959a",
};

export const createUserDocument = async (user: any) => {
  const db = getFirestore();
  const { displayName, email, uid } = user;
  const userDocRef = doc(db, "user", uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: new Date(),
      });
      console.log("Document set");
    } catch (error) {
      console.log("Could not set the Document: ", error);
    }
  }
};

export const onAuthStateChangedLister = (callback: NextOrObserver<User>) => {
  const auth = getAuth();
  onAuthStateChanged(auth, callback);
};
