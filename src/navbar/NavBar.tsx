import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Header, Icon, Image, Input, Menu } from 'semantic-ui-react';
import { Pages } from "../shared/Pages";
import { auth } from "../firebase/firebase";
import { MenuItemNavLink } from "./MenuItemNavLink";
import 'react-toastify/dist/ReactToastify.css';

export function NavBar() {
  const [user] = useAuthState(auth);
  return (
    <Menu secondary style={{ borderBottom: "1px solid rgb(238,239,239)" }}>
      <MenuItemNavLink to={`/${Pages.Home}`} pageid={Pages.Home} child={<Header as="h1" color="teal">Commently</Header>} disableactive={"true"} />
      <Menu.Item style={{ minWidth: "40%" }}>
        <Input
          icon={<Icon name='search' link />}
          placeholder='Search...'
          onChange={(e) => console.log(e)}
        />
      </Menu.Item>
      {user && <Menu.Menu position="right">
        <MenuItemNavLink to={`/${Pages.Settings}`} pageid={Pages.Settings} child={user.photoURL ? <Image avatar src={"" + user.photoURL} /> : <Icon name="setting" />} />
        <MenuItemNavLink name={"Logout"} to={`/${Pages.Logout}`} pageid={Pages.Logout} />
      </Menu.Menu>}
      {!user &&
        <Menu.Menu position="right">
          <MenuItemNavLink to={`/${Pages.SignIn}`} pageid={Pages.SignIn} child={<><Icon name="sign in" /> Sign in</>} />
        </Menu.Menu>
      }
    </Menu>
  );
}
