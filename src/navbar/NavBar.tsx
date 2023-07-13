import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Dropdown, Header, Icon, Image, Input, Menu } from 'semantic-ui-react';
import { Pages } from "../shared/Pages";
import { auth } from "../firebase/firebase";
import { MenuItemNavLink } from "./MenuItemNavLink";
import 'react-toastify/dist/ReactToastify.css';

export function NavBar() {
  const [user] = useAuthState(auth);
  return (
    <>
      <Menu secondary style={{ borderBottom: "1px solid rgb(238,239,239)" }} className="desktopMenu">
        <MenuItemNavLink to={`/${Pages.Home}`} pageid={Pages.Home} child={<Header as="h1" color="teal">Commently</Header>} disableactive={"true"} />
        <Menu.Item style={{ minWidth: "40%" }}>
          <Input
            icon={<Icon name='search' link />}
            placeholder='Search...'
            onChange={(e) => console.log(e)}
          />
        </Menu.Item>
        {user && <>
          <MenuItemNavLink to={`/${Pages.Settings}`} pageid={Pages.Settings} child={user.photoURL ? <Image avatar src={"" + user.photoURL} /> : <Icon name="setting" />} position="right" />
          <MenuItemNavLink name={"Logout"} to={`/${Pages.Logout}`} pageid={Pages.Logout} position="right" />
        </>}
        {!user &&
          <>
            <MenuItemNavLink to={`/${Pages.SignIn}`} pageid={Pages.SignIn} child={<><Icon name="sign in" /> Sign in</>} position="right" />
          </>
        }
      </Menu>
      <Container fluid>
        <Menu stackable secondary style={{ borderBottom: "1px solid rgb(238,239,239)", marginBottom: "1rem", paddingBottom: "0.5rem" }} className="mobileMenu">
          <Menu.Item><Dropdown icon='bars' simple>
            <Dropdown.Menu>
              {user && <>
                <MenuItemNavLink to={`/${Pages.Settings}`} pageid={Pages.Settings} child={user.photoURL ? <Image avatar src={"" + user.photoURL} /> : <Icon name="setting" />} position="right" isDropdownItem />
                <MenuItemNavLink name={"Logout"} to={`/${Pages.Logout}`} pageid={Pages.Logout} position="right" isDropdownItem />

              </>}
              {!user &&
                <>
                  <MenuItemNavLink to={`/${Pages.SignIn}`} pageid={Pages.SignIn} child={<><Icon name="sign in" /> Sign in</>} position="right" isDropdownItem />
                </>
              }
            </Dropdown.Menu>
          </Dropdown>
            <span style={{ color: "#00B5AD", fontSize: "2rem", paddingInlineStart: "10px" }}>Commently</span>
          </Menu.Item>

          <Menu.Item>
            <Input
              icon={<Icon name='search' link />}
              placeholder='Search...'
              onChange={(e) => console.log(e)}
            />
          </Menu.Item>
        </Menu></Container>
    </>
  );
}
