import { formatDistance } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Comment, Icon } from 'semantic-ui-react';
import { IComment } from '../../DTO/Comment/IComment';
import { IPublicUserInfo } from '../../DTO/User/IUser';
import { userRepository } from '../../Repository/UserRepository/UserRepository';

export interface ICommentItemProps {
    comment: IComment;
}

export const CommentItem = ({ comment }: ICommentItemProps) => {
    const [author, setAuthor]: [IPublicUserInfo | undefined, any] = useState();
    const getUserPhotoUrl = useCallback(
        async () => {
            const receivedUser = await userRepository.getPublicUserInfo(comment.creatorUid);
            setAuthor(receivedUser);
        },
        [comment]);

    useEffect(() => {
        getUserPhotoUrl();
    }, [getUserPhotoUrl]);

    return (<Comment>
        {(author?.photoUrl && <Comment.Avatar src={author?.photoUrl} />) || <Icon name='user' />}
        <Comment.Content>
            <Comment.Author as='a'>{author?.username}</Comment.Author>
            <Comment.Metadata>
                <div>{formatDistance(new Date(Number(comment.createdAt)), new Date(), { addSuffix: true })}</div>
            </Comment.Metadata>
            <Comment.Text>{comment?.text}</Comment.Text>
            <Comment.Actions>
                <Comment.Action>
                    <Icon name='thumbs up outline' />
                    <span>1,000</span>
                </Comment.Action>
                <Comment.Action>
                    <Icon name='thumbs down outline' />
                    <span>1,000</span>
                </Comment.Action>
                <Comment.Action>Reply</Comment.Action>
                <Comment.Action>Edit</Comment.Action>
                <Comment.Action>Delete</Comment.Action>
            </Comment.Actions>
            <Comment.Actions style={{ padding: "10px" }}>
                <a style={{ color: "#1678C2" }}><Icon name='angle up' />View 98 replies</a>
            </Comment.Actions>
        </Comment.Content>
    </Comment>)
}