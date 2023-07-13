import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Comment, Container, Grid, Header, Loader, Segment } from "semantic-ui-react";
import { IComment } from "../../DTO/Comment/IComment";
import { ISite } from "../../DTO/Site/ISite";
import { commentRepository } from "../../Repository/CommentRepository/CommentRepository";
import { siteRepository } from "../../Repository/SiteRepository/SiteRepository";
import { toTitleCase } from "../../shared/StringHelpers";
import { ReactComponent as WarningLogo } from "../../res/img/warning.svg";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";

export function Comments() {
    const [searchParams] = useSearchParams();
    const siteUrl = useMemo(() => {
        return searchParams.get('site');
    }, [searchParams]);
    const [comments, setComments]: [IComment[], any] = useState([]);
    const [siteInfo, setSiteInfo]: [ISite | undefined, any] = useState();
    const [loadingSiteInfo, setLoadingSiteInfo]: [boolean, any] = useState(true);
    const [errorLoading, setErrorLoading]: [boolean, any] = useState(false);

    const fetchComments = useCallback(async () => {
        if (!siteUrl) return;
        try {
            setErrorLoading(() => false);
            setLoadingSiteInfo(true);
            const site: ISite = (await siteRepository.getSite(siteUrl)) || { canonicalUrl: siteUrl };
            setLoadingSiteInfo(false);
            const commentData = await commentRepository.getComments(site);
            setSiteInfo(site);
            setComments(commentData);
        } catch (error) {
            console.error(error);
            setErrorLoading(() => true);
        }
    }, [siteUrl]);



    useEffect(() => {
        fetchComments().catch(console.error);
    }, [fetchComments]);
    const sitePage = (
        <Container fluid>
            <Header as="h2">
                {(siteInfo?.favicon && <img src={siteInfo?.favicon} alt={"favicon for " + siteInfo.canonicalUrl} />) || (siteInfo?.clearbit && <img src={siteInfo.clearbit} alt={"favicon for " + siteInfo.canonicalUrl} />) || (siteInfo?.img && <img src={siteInfo?.img} alt={"favicon for " + siteInfo.canonicalUrl} />)}
                {!errorLoading && toTitleCase(siteInfo?.title || siteInfo?.canonicalUrl || siteUrl || "Loading site url...")}
            </Header>
            {siteInfo?.description && <p>{siteInfo.description}</p>}
            {errorLoading && <>
                <Grid centered>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Segment>
                                <Grid.Row columns={1}>
                                    <Grid.Column>
                                        <WarningLogo height={300} />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={1}>
                                    <Grid.Column>
                                        <Header as="h2">Oops! We have encountered an error and are now working on it. Please check back soon!</Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>}
            {!errorLoading &&
                (<>
                    <Comment.Group>
                        {siteInfo && <CommentForm siteInfo={siteInfo} setComments={setComments} />}
                        {comments.map((comment, idx) => {
                            return (
                                <CommentItem key={"comment" + idx} comment={comment} />
                            )
                        })}
                    </Comment.Group>
                </>)
            }
        </Container>)
    const siteLoader = (
        <Grid columns={1} centered>
            <Grid.Row>
                <h2><Loader inline active /> Loading site: {siteUrl?.toLocaleLowerCase()}</h2>
            </Grid.Row>
        </Grid>
    )
    return (loadingSiteInfo ? siteLoader : sitePage);
}