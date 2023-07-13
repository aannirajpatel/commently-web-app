import { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Form, TextAreaProps } from "semantic-ui-react";
import { IComment } from "../../DTO/Comment/IComment";
import { ISite } from "../../DTO/Site/ISite";
import { auth } from "../../firebase/firebase";
import { commentRepository } from "../../Repository/CommentRepository/CommentRepository";

export interface ICommentFormProps {
    siteInfo: ISite;
    setComments: any;
}

export const CommentForm = ({ siteInfo, setComments }: ICommentFormProps) => {
    const [user] = useAuthState(auth);
    const [text, setText]: [string, any] = useState("");
    const [loading, setLoading] = useState(false);
    const createComment = useCallback(async () => {
        if (!user || !siteInfo) return;
        try {
            if (loading) return;
            setLoading(true);
            const commentDraft: IComment = { creatorUid: user?.uid!, text: text, createdTimestamp: Date.now().toString() };
            const createdComment = await commentRepository.createComment(commentDraft, siteInfo, user);
            setComments((c: IComment[]) => { return [createdComment, ...c]; });
            setText("");
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }, [siteInfo, setComments, text, user, loading]);

    const handleSetText = (event: React.ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps): void => {
        setText(event.target.value);
    }
    return (
        <Form reply onSubmit={e => e.preventDefault()}>
            <Form.TextArea onChange={handleSetText} />
            {loading && <Button labelPosition='left' icon='edit' primary loading>Add comment</Button>}
            {!loading && <Button labelPosition='left' icon='edit' primary onClick={createComment} content="Add comment"></Button>}
        </Form>
    );
}