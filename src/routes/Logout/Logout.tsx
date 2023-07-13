import React, { useEffect } from "react";
import { Dimmer, Grid, Loader, Segment } from "semantic-ui-react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { RequiresAuth } from "../../auth/RequiresAuth";
import { ToastQueries } from "../../shared/ToastQueries";

export function Logout() {
    const [user, , error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            signOut(auth).then().catch((err) => toast.error("Error logging out. If this persists, please contact support."));
        }
    }, [user, navigate, error])
    return (
        <Grid centered columns={1}>
            <Grid.Row>
                <Segment raised compact>
                    <Grid centered columns={1}>
                        <Grid.Row>
                            <Dimmer active inverted>
                                <Loader inverted>Logging out</Loader>
                            </Dimmer>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Grid.Row>
            <RequiresAuth noAuthToast={ToastQueries.LoggedOutWarn}/>
        </Grid>
    )
}