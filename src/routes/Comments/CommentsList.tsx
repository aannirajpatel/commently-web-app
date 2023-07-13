import React from "react";
import { Comment } from "semantic-ui-react";
import { IComment } from "../../DTO/Comment/IComment";
import { ISite } from "../../DTO/Site/ISite";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";

export function CommentsList(siteInfo: ISite | undefined, setComments: any, comments: IComment[]): React.ReactNode {
    return <>
        {siteInfo && <CommentForm siteInfo={siteInfo} setComments={setComments} />}
        <Comment.Group>
            {comments.map((comment, idx) => {
                return (
                    <CommentItem key={"comment" + idx} comment={comment} />
                );
            })}
        </Comment.Group>
    </>;
}
