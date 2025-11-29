import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCkfREzkWsnDjKyAv8VsQJqLOhlUTsIM6I",
  authDomain: "olx-clone-590b2.firebaseapp.com",
  projectId: "olx-clone-590b2",
  storageBucket: "olx-clone-590b2.firebasestorage.app",
  messagingSenderId: "642382694154",
  appId: "1:642382694154:web:200460ffd84a0d011d9cf3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password, phone) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      phone,
    });
    return res;
  } catch (err) {
    console.log(err);
    toast.error("Email already in used");
  }
};
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (err) {
    console.log(err);
    toast.error("Invalid email or password");
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, logout };
