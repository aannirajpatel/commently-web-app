import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { IMenuItemNavLinkProps } from "./IMenuItemNavLinkProps";

export function MenuItemNavLink(props: IMenuItemNavLinkProps) {
    const location = useLocation();
    return <Menu.Item style={props.style ?? {}}
        as={Link}
        {...props}
        active={location.pathname.startsWith(props.to) && !props?.disableactive}>
        {props?.child}
    </Menu.Item>;
}