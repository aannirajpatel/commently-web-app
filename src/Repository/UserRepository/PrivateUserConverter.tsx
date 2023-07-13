import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { IPrivateUserInfo } from '../../DTO/User/IUserPrivate';

export const firebasePrivateUserInfoConverter: FirestoreDataConverter<IPrivateUserInfo> = {
    toFirestore: (user: IPrivateUserInfo): FirebaseCreatePrivateUserInfoDto => {
        return {
            email: user.email,
            authProvider: user.authProvider
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<FirebaseReceivedPrivateUserInfoDto>, options: SnapshotOptions) => {
        const data = snapshot.data(); return {
            authProvider: data.authProvider,
            email: data.email,
        };
    }
};

export interface FirebaseCreatePrivateUserInfoDto extends DocumentData {
    authProvider: string;
    email: string;
}

export interface FirebaseReceivedPrivateUserInfoDto extends DocumentData, IPrivateUserInfo {
    authProvider: string;
    email: string;
}