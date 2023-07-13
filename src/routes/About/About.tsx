import React from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';

export function About(): JSX.Element {

    return <Container fluid>
        <Segment>
            <Header as='h1'>What is <span style={{ color: "#00B5AD" }}>Commently</span>?</Header>
            <p>
                Commently is a web-based social platform that allows people to read and write comments along with other information like information reliability, bias (applies in the case of news articles), etc. for any location on the internet! Our goal is to help any and all internet users get and share helpful information about places on the internet.
            </p>
            <Header as='h2'>How do I use it?</Header>

            <Header as='h3'>On a PC (Windows, Mac, or Linux)</Header>
            <p>The best way to use Commently on PC is to first download the <a style={{ color: "#00B5AD" }} href="https://commently.net/#/about">Commently Chrome extension (coming soon)</a>.
                Alternatively, you can simply browse the Commently website, which you are currently doing by reading this About page. <br /><br />
                When you encounter a site that you want to comment on or read the comments of, simply click on Commently's extension icon.<br /><br />
                On certain sites, for example, Google, the Commently chrome extension provides additional functionality (this can be turned off
                according to your preference) to quickly view Commently comments and site information for the links on the page you are browsing,
                saving you time and giving you valuable information about that site.
            </p>
            <Header as='h3'>On a Mobile device (Android or iOS)</Header>
            <p>
                The best way to use Commently on a mobile device is to first download the <a style={{ color: "#00B5AD" }} href="https://commently.net/#/about">Commently Android app (coming soon)</a> or the <a style={{ color: "#00B5AD" }} href="https://commently.net">Commently iOS app (coming soon)</a>.
                You will then be able to hit share on the browser you are using (Safari, Chrome, etc.) to share the site you are browsing with Commently. Commently will then pop up and show you the Commently page for the site you shared with it.
            </p>
        </Segment>

    </Container>
}