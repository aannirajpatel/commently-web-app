import { collection, getDocs, query, where, setDoc, doc, getDoc } from 'firebase/firestore';
import { signInWithPopup } from "firebase/auth";
import { auth, gProvider, db } from "../../firebase/firebase";
import { firebasePublicUserInfoConverter } from './UserConverter';
import { IPublicUserInfo } from '../../DTO/User/IUser';
import { firebasePrivateUserInfoConverter } from './PrivateUserConverter';
import { IPrivateUserInfo } from '../../DTO/User/IUserPrivate';
import { DEV } from '../../shared/Constants';

export async function signInWithGoogle() {
  try {
    const res = await signInWithPopup(auth, gProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      const publicDataRef = doc(db, "users", user.uid).withConverter(firebasePublicUserInfoConverter);
      await setDoc(publicDataRef, {
        uid: user.uid as string,
        username: user.displayName as string,
        photoUrl: user.photoURL as string
      });
      const privateDataRef = doc(db, "users", user.uid, "private", "info");
      await setDoc(privateDataRef, {
        authProvider: "google",
        email: user.email as string,
      });
    }
  } catch (err) {
    DEV && console.log(err);
  }
}

class UserRepository {
  public async getPublicUserInfo(uid: string): Promise<IPublicUserInfo> {
    console.log("Getting user for uid:" + uid);
    const publicUserInfo = (await (getDoc(doc(db, `users/${uid}`).withConverter(firebasePublicUserInfoConverter)))).data()!
    DEV && console.log("Public user info: " + JSON.stringify(publicUserInfo));
    return publicUserInfo;
  }
  public async getPrivateUserInfo(creatorUid: string): Promise<IPrivateUserInfo> {
    console.log("Getting comment creator details for creatorUid:" + creatorUid);
    const privateUserInfo = (await (getDoc(doc(db, `users/${creatorUid}`).withConverter(firebasePrivateUserInfoConverter)))).data()!
    DEV && console.log("Private user info: " + JSON.stringify(privateUserInfo));
    return privateUserInfo;
  }
}

export const userRepository = new UserRepository();