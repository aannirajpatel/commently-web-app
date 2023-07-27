import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { ReactComponent as WarningLogo } from "../../res/img/warning.svg";

export function ThereWasAnError() {
    return <>
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
    </>;
}
