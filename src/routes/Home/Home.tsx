import React from "react";
import { Button, Container, Header, Label } from "semantic-ui-react";
export function Home() {


    return (<>
        <Container fluid textAlign="center">
            <Header as="h2">Home</Header>
            <Label as='a' color='red' image className="feedLabel">
                <img src='https://cnn.com/favicon.ico' alt="" />
                cnn.com
                <Label.Detail>News</Label.Detail>
            </Label>
            <Label as='a' color='blue' image className="feedLabel">
                <img src='https://foxnews.com/favicon.ico' alt="" />
                foxnews.com
                <Label.Detail>News</Label.Detail>
            </Label>
            <Label as='a' image className="feedLabel">
                <img src='https://youtube.com/favicon.ico' alt="" />
                Youtube.com
                <Label.Detail>Entertainment</Label.Detail>
            </Label>
            <Button size="mini">+ Add sites to follow</Button>
            <br />
            <a href="https://commently.net/#/comments?site=https://www.reddit.com">Click here to see the demo for the comments page to a webpage</a>
        </Container>
    </>)
}