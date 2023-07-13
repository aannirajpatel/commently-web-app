import { db } from '../../firebase/firebase';
import { collection, getDocs, QuerySnapshot, addDoc, getDoc } from "firebase/firestore";
import { IComment } from '../../DTO/Comment/IComment';
import { firebaseCommentConverter } from '../../DTO/Comment/CommentConverter';
import { ISite } from '../../DTO/Site/ISite';
import { Errors } from '../../shared/Errors';
import { User } from 'firebase/auth';
class CommentRepository {
    async getComments(site: ISite): Promise<IComment[]> {
        const commentDocs: QuerySnapshot<IComment> = await getDocs(collection(db, "sites", site.firestoreSiteId, "comments").withConverter(firebaseCommentConverter));
        const comments: IComment[] = [];
        commentDocs.forEach((commentDoc) => { comments.push(commentDoc.data()) });
        console.log("Received: " + JSON.stringify(comments));
        return comments;
    }

    async createComment(comment: IComment, site: ISite, user: User) {
        if (!user) {
            throw new Error(Errors.AuthRequired);
        } else {
            const docRef = (await addDoc(collection(db, `sites/${site.firestoreSiteId}/comments/`), comment)).withConverter(firebaseCommentConverter);
            return (await getDoc(docRef)).data()
        }
    }
};

export const commentRepository = new CommentRepository();