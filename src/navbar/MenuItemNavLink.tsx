import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import { IMenuItemNavLinkProps } from "./IMenuItemNavLinkProps";

export function MenuItemNavLink(props: IMenuItemNavLinkProps) {
    const location = useLocation();
    if (props.isdropdownitem === "true")
        return <Dropdown.Item active={location.pathname.startsWith(props.to) && !props?.disableactive} as={Link} {...props}>{props?.child}</Dropdown.Item>;
    else
        return <Menu.Item style={props.style ?? {}}
            as={Link}
            {...props}
            active={location.pathname.startsWith(props.to) && !props?.disableactive}>
            {props?.child}
        </Menu.Item>;
}