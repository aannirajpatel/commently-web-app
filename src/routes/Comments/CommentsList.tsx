import React from "react";
import { Comment } from "semantic-ui-react";
import { IComment } from "../../DTO/Comment/IComment";
import { IPage } from "../../DTO/Page/IPage";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";

export function CommentsList({siteInfo, setComments, comments}: {siteInfo: IPage | undefined, setComments: any, comments: IComment[]}){
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
