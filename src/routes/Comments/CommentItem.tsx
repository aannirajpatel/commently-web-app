import React, { useCallback, useEffect, useState } from 'react';
import { Comment, Icon } from 'semantic-ui-react';
import { IComment } from '../../DTO/Comment/IComment';
import { IUser } from '../../DTO/User/IUser';
import { userRepository } from '../../Repository/UserRepository/UserRepository';

export interface ICommentItemProps {
    comment: IComment;
}

export const CommentItem = ({ comment }: ICommentItemProps) => {
    const [user, setUser]: [IUser | undefined, any] = useState();
    const getUserPhotoUrl = useCallback(
        async () => {
            const receivedUser = await userRepository.getUser(comment.creatorUid);
            console.log(receivedUser);
            setUser(receivedUser);
        },
        [comment]);

    useEffect(() => {
        getUserPhotoUrl();
    }, [getUserPhotoUrl]);

    return (<Comment>
        {(user?.photoUrl && <Comment.Avatar src={user?.photoUrl} />) || <Icon name='user' />}
        <Comment.Content>
            <Comment.Author as='a'>{user?.username}</Comment.Author>
            <Comment.Metadata>
                <div>{comment?.createdTimestamp}</div>
            </Comment.Metadata>
            <Comment.Text>{comment?.text}</Comment.Text>
            <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
        </Comment.Content>
    </Comment>)
}