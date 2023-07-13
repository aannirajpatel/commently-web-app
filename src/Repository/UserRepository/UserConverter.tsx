import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { IPublicUserInfo } from '../../DTO/User/IUser';

export const firebasePublicUserInfoConverter: FirestoreDataConverter<IPublicUserInfo> = {
    toFirestore: (user: IPublicUserInfo): FirebaseCreateUserDto => {
        return {
            username: user.username,
            uid: user.uid,
            photoUrl: user.photoUrl
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<FirebaseReceivedUserDto>, options: SnapshotOptions) => {
        const data = snapshot.data(); return {
            uid: data.uid,
            username: data.username,
            photoUrl: data.photoUrl
        };
    }
};

export interface FirebaseCreateUserDto extends DocumentData {
    uid: string;
    username: string;
    photoUrl: string;
}

export interface FirebaseReceivedUserDto extends DocumentData, IPublicUserInfo {
    uid: string;
    username: string;
    photoUrl: string;
}