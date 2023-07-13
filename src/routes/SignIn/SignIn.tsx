import React, { useEffect } from "react";
import { Button, Grid, Header, Icon, Segment } from "semantic-ui-react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";
import { signInWithGoogle } from "../../Repository/UserRepository/UserRepository";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pages } from "../../shared/Pages";
import { useToastQuery } from "../../shared/UseToastQuery";
import { Showpieces } from "./Showpieces";
import { useRedirectQuery } from "../../shared/UseRedirectQuery";

export function SignIn() {
    useToastQuery(Pages.SignIn);
    useRedirectQuery();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();



    useEffect(() => {
        if (user) {
            console.log(JSON.stringify(user));
            navigate(`/${Pages.Home}`);
        }
        if (error) toast.error("There was a problem signing you in, please try again.");
    }, [user, navigate, error]);



    return (
        <>
            <Grid centered columns={2}>
                <Grid.Column>
                    <Segment raised compact>
                        <Grid centered columns={1}>
                            <Grid.Row only="computer">
                                <Header as='h2'>Sign in to <span style={{ color: "#00B5AD" }}>Commently</span></Header>
                            </Grid.Row>
                            <Grid.Row only="mobile tablet">
                                <Header as='h2'>Sign in</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <p>The world of comments is waiting...</p>
                            </Grid.Row>
                            <Grid.Row>
                                <Button color='google plus' onClick={signInWithGoogle} disabled={loading} loading={loading}>
                                    <Icon name='google' /> Sign in with Google
                                </Button>
                            </Grid.Row>
                            <Grid.Row>
                                <Button color='facebook' disabled={loading} loading={loading}>
                                    <Icon name='facebook' /> Sign in with Facebook
                                </Button>
                            </Grid.Row>
                            <Grid.Row>
                                <Link to={`/${Pages.Home}`}>Continue to the homepage without signing in...</Link>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Column>
            </Grid>
            <Showpieces />
        </>
    )
}


