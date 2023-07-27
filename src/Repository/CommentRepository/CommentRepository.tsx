import { db } from '../../firebase/firebase';
import { collection, getDocs, QuerySnapshot, addDoc, getDoc } from "firebase/firestore";
import { IComment } from '../../DTO/Comment/IComment';
import { firebaseCommentConverter } from './CommentConverter';
import { IPage } from '../../DTO/Page/IPage';
import { Errors } from '../../shared/Errors';
import { User } from 'firebase/auth';

class CommentRepository {
    async getComments(page: IPage): Promise<IComment[]> {
        const commentDocs: QuerySnapshot<IComment> = await getDocs(collection(db, "pages", page.pageId, "comments").withConverter(firebaseCommentConverter));
        const comments: IComment[] = [];
        commentDocs.forEach((commentDoc) => { comments.push(commentDoc.data()) });
        console.log("Received: " + JSON.stringify(comments));
        return comments;
    }

    async createComment(comment: IComment, site: IPage, user: User) {
        if (!user) {
            throw new Error(Errors.AuthRequired);
        } else {
            const docRef = (await addDoc(collection(db, `pages/${site.pageId}/comments/`), comment)).withConverter(firebaseCommentConverter);
            return (await getDoc(docRef)).data()
        }
    }
};

export const commentRepository = new CommentRepository();