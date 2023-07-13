import { Pages } from "../shared/Pages";

export interface IMenuItemNavLinkProps {
    pageid: Pages;
    name?: string;
    to: string;
    child?: JSX.Element;
    disableactive?: string;
    style?: any;
}