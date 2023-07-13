import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Pages } from "./Pages";
import { ToastQueries } from "./ToastQueries";

export const useToastQuery = (pageToShowAfterToast?: Pages) => {
    const [searchParams] = useSearchParams();
    const toastQuery = useMemo(() => {
        return searchParams.get('toast');
    }, [searchParams]);
    const navigateTo = useNavigate();
    useEffect(() => {
        switch (toastQuery) {
            case ToastQueries.AuthNeededInfo:
                toast.info("Please sign in to use this feature of Commently...");
                break;
            case ToastQueries.LoggedOutWarn:
                toast.warn("You have been logged out...");
                break;
        }
        if (toastQuery && pageToShowAfterToast) navigateTo(`/${pageToShowAfterToast}`);
    }, [toastQuery, navigateTo, pageToShowAfterToast]);
}