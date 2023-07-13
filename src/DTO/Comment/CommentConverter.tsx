import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { IComment } from "./IComment";

export const firebaseCommentConverter: FirestoreDataConverter<IComment> = {
    toFirestore: (comment: IComment): FirebaseCreateCommentDTO => {
        return {
            text: comment.text,
            createdTimeStamp: comment.createdTimestamp,
            creatorUid: comment.creatorUid
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<FirebaseReceivedCommentDTO>, options: SnapshotOptions): IComment => {
        const data = snapshot.data(options)!;
        return { text: data.text, creatorUid: data.creatorUid, createdTimestamp: data.createdTimeStamp };
    }
};

interface FirebaseCreateCommentDTO extends DocumentData {
    text: string;
    creatorUid: string;
    createdTimeStamp: string;
}

interface FirebaseReceivedCommentDTO extends DocumentData {
    text: string;
    creatorUid: string;
    createdTimeStamp: string;
}