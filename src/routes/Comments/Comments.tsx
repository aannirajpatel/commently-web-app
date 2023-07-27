import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Grid, Header, Loader } from "semantic-ui-react";
import { IComment } from "../../DTO/Comment/IComment";
import { IPage } from "../../DTO/Page/IPage";
import { commentRepository } from "../../Repository/CommentRepository/CommentRepository";
import { siteRepository } from "../../Repository/SiteRepository/SiteRepository";
import { toTitleCase } from "../../shared/StringHelpers";
import { SiteThumbnail } from "./SiteThumbnail";
import { SiteDescription as SiteDescriptionIfExists } from "./SiteDescription";
import { ThereWasAnError } from "./ThereWasAnError";
import { CommentsList } from "./CommentsList";

export function Comments() {
    const [searchParams] = useSearchParams();
    const siteUrl = useMemo(() => {
        return searchParams.get('site');
    }, [searchParams]);
    const [comments, setComments]: [IComment[], any] = useState([]);
    const [siteInfo, setSiteInfo]: [IPage | undefined, any] = useState();
    const [loading, setLoading]: [boolean, any] = useState(true);
    const [errorLoading, setErrorLoading]: [boolean, any] = useState(false);

    const fetchComments = useCallback(async () => {
        if (!siteUrl) return;
        try {
            setErrorLoading(() => false);
            setLoading(true);
            const site: IPage = (await siteRepository.getSite(siteUrl)) || { canonicalUrl: siteUrl };
            const commentData = await commentRepository.getComments(site);
            setSiteInfo(site);
            setComments(commentData);
            setLoading(false);
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
                {!errorLoading && SiteThumbnail(siteInfo)}
                {!errorLoading && toTitleCase(siteInfo?.title || siteInfo?.canonicalUrl || siteUrl || "Please provide a site url...")}
            </Header>
            {SiteDescriptionIfExists(siteInfo)}
            {errorLoading ? <ThereWasAnError/> : <CommentsList {...{siteInfo, setComments, comments}}/>}
        </Container>);

    const siteLoader = (
        <Grid columns={1} centered>
            <Grid.Row>
                <h2><Loader inline active /> Loading site: {siteUrl?.toLocaleLowerCase()}</h2>
            </Grid.Row>
        </Grid>
    );

    return (loading ? siteLoader : sitePage);
}
