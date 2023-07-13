import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IRequiresAuthProps } from './IRequiresAuthProps';
import { auth } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { Pages } from '../shared/Pages';

export const RequiresAuth = ({ noAuthToast, redirectTo }: IRequiresAuthProps) => {
    const [user, loading] = useAuthState(auth);
    const navigateTo = useNavigate();
    useEffect(() => {
        if (!user && !loading) {
            if (noAuthToast) {
                if (redirectTo) {
                    navigateTo(`/${Pages.SignIn}?toast=${noAuthToast}&redirect=${redirectTo}`);
                }
                else { navigateTo(`/${Pages.SignIn}?toast=${noAuthToast}`); }
            }
        };
    }, [user, navigateTo, noAuthToast, redirectTo, loading])
    return <></>
}