import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useRedirectQuery = () =>{
    const [searchParams] = useSearchParams();
    const redirectQuery = useMemo(()=> {
    return searchParams.get('redirect');
    },[searchParams]);
    const navigateTo = useNavigate();
    useEffect(()=>{
     if(redirectQuery) navigateTo(redirectQuery);
    },[redirectQuery, navigateTo]);
}