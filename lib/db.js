import app from "./firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export function createUser(uid, data) {
  const usersRef = collection(db, "users");
  setDoc(doc(usersRef, uid), { uid, ...data }, { merge: true }).then();
}

export function createSite(data) {
  const sitesRef = collection(db, "sites");
  addDoc(sitesRef, data).then();
}
