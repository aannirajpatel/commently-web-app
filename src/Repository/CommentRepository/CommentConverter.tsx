import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { IComment } from "../../DTO/Comment/IComment";

export const firebaseCommentConverter: FirestoreDataConverter<IComment> = {
    toFirestore: (comment: IComment): FirebaseCreateCommentDTO => {
        return {
            text: comment.text,
            createdAt: comment.createdAt,
            creatorUid: comment.creatorUid
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<FirebaseReceivedCommentDTO>, options: SnapshotOptions): IComment => {
        const data = snapshot.data(options)!;
        return data;
    }
};

interface FirebaseCreateCommentDTO extends DocumentData {
    text: string;
    creatorUid: string;
    createdAt: string;
}

interface FirebaseReceivedCommentDTO extends DocumentData {
    text: string;
    creatorUid: string;
    createdAt: string;
}