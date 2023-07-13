import { ToastQueries } from "../shared/ToastQueries";

export interface IRequiresAuthProps {
    noAuthToast?: ToastQueries;
    redirectTo?: string;
};