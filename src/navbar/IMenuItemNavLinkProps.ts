import { Pages } from "../shared/Pages";

export interface IMenuItemNavLinkProps {
    pageid: Pages;
    name?: string;
    position?: 'left' | 'right';
    to: string;
    child?: JSX.Element;
    disableactive?: string;
    style?: any;
    isdropdownitem?: string;
}