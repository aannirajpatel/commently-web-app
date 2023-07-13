import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { IUser } from './IUser';

export const firebaseUserConverter: FirestoreDataConverter<IUser> = {
    toFirestore: (user: IUser): FirebaseCreateUserDto => {
        return {
            username: user.username,
            uid: user.uid,
            photoUrl: user.photoUrl,
            email: user.email,
            authProvider: user.authProvider
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<FirebaseReceivedUserDto>, options: SnapshotOptions) => {
        const data = snapshot.data(); return {
            uid: data.uid,
            username: data.username,
            authProvider: data.authProvider,
            email: data.email,
            photoUrl: data.photoUrl
        };
    }
};

export interface FirebaseCreateUserDto extends DocumentData {
    uid: string;
    username: string;
    authProvider: string;
    email: string,
    photoUrl: string
}
export interface FirebaseReceivedUserDto extends DocumentData, IUser {
    uid: string;
    username: string;
    authProvider: string;
    email: string,
    photoUrl: string
}