import { collection, getDocs, query, where, setDoc, doc, getDoc } from 'firebase/firestore';
import { signInWithPopup } from "firebase/auth";
import { auth, gProvider, db } from "../../firebase/firebase";
import { firebaseUserConverter } from '../../DTO/User/UserConverter';
import { IUser } from '../../DTO/User/IUser';

export async function signInWithGoogle() {
  try {
    const res = await signInWithPopup(auth, gProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      const ref = doc(db, "users", user.uid).withConverter(firebaseUserConverter);
      await setDoc(ref, {
        uid: user.uid as string,
        username: user.displayName as string,
        authProvider: "google",
        email: user.email as string,
        photoUrl: user.photoURL as string
      });
    }
  } catch (err) {
    console.log(err);
  }
}

class UserRepository {
  public async getUser(uid: string): Promise<IUser> {
    console.log("Getting user for uid:" + uid);
    return (await (getDoc(doc(db, `users/${uid}`).withConverter(firebaseUserConverter)))).data()!
  }
}

export const userRepository = new UserRepository();