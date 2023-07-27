import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Dropdown, Form, FormInput, Icon, Image, Input, Menu } from 'semantic-ui-react';
import { Pages, getCommentsPagePath } from "../shared/Pages";
import { auth } from "../firebase/firebase";
import { MenuItemNavLink } from "./MenuItemNavLink";
import 'react-toastify/dist/ReactToastify.css';
import { default as logo } from '../res/img/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
export function NavBar() {
  const [user] = useAuthState(auth);
  const [searchState, setSearchState] = useState('');
  const navigateTo = useNavigate()

  const onSubmit = () => { navigateTo(getCommentsPagePath(searchState)); setSearchState(''); };
  return (
    <>
      <Menu secondary style={{ borderBottom: "1px solid rgb(238,239,239)" }} className="desktopMenu">
        <MenuItemNavLink to={`/${Pages.Home}`} pageid={Pages.Home} child={<img src={logo} alt="Commently Logo" />} disableactive={"true"} />
        <Menu.Item style={{ minWidth: "40%" }}>
          <Form onSubmit={onSubmit} style={{ flexGrow: '1' }}>
            <FormInput
              icon={<Icon name='search' link onClick={onSubmit} />}
              placeholder={'Enter a URL to open its comments page (in future, we\'ll also support search)...'}
              onChange={(_e, data) => setSearchState(data.value)}
            />
          </Form>
        </Menu.Item>
        {user && <Menu.Menu position="right">
          <MenuItemNavLink to={`/${Pages.Settings}`} pageid={Pages.Settings} child={user.photoURL ? <Image avatar src={"" + user.photoURL} /> : <Icon name="setting" />} />
          <MenuItemNavLink to={`/${Pages.About}`} pageid={Pages.About} child={<><Icon name="info" /> About</>} />
          <MenuItemNavLink name={"Logout"} to={`/${Pages.Logout}`} pageid={Pages.Logout} />
        </Menu.Menu>}
        {!user &&
          <Menu.Menu position="right">
            <MenuItemNavLink to={`/${Pages.About}`} pageid={Pages.About} child={<><Icon name="info" /> About</>} />
            <MenuItemNavLink to={`/${Pages.SignIn}`} pageid={Pages.SignIn} child={<><Icon name="sign in" /> Sign in</>} />
          </Menu.Menu>

        }
      </Menu>
      <Container fluid>
        <Menu secondary style={{ borderBottom: "1px solid rgb(238,239,239)", marginBottom: "1rem" }} className="mobileMenu">
          <MenuItemNavLink to={`/${Pages.Home}`} pageid={Pages.Home} child={<img src={logo} alt="Commently Logo" />} disableactive={"true"} />
          <Menu.Item>
            <Container fluid><Input
              icon={<Icon name='search' link />}
              placeholder='Search...'
              onChange={(e) => { console.log("Change"); console.log(e); }}
              onKeyDown={(e: any) => { console.log("Keydown"); console.log(e); }}
            />
            </Container>
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown icon='bars' item simple direction="right">
              <Dropdown.Menu direction="right">
                {user && <>
                  <MenuItemNavLink to={`/${Pages.Settings}`} pageid={Pages.Settings} child={<>Account Settings</>/* user.photoURL ? <Image avatar src={"" + user.photoURL} /> : <Icon name="setting" /> */} position="right" isdropdownitem={"true"} />
                  <MenuItemNavLink to={`/${Pages.About}`} pageid={Pages.About} child={<><Icon name="info" /> About</>} isdropdownitem={"true"} />
                  <MenuItemNavLink name={"Logout"} to={`/${Pages.Logout}`} pageid={Pages.Logout} child={<>Logout</>} position="right" isdropdownitem={"true"} />

                </>}
                {!user &&
                  <>
                    <MenuItemNavLink to={`/${Pages.About}`} pageid={Pages.About} child={<><Icon name="info" /> About</>} isdropdownitem={"true"} />
                    <MenuItemNavLink to={`/${Pages.SignIn}`} pageid={Pages.SignIn} child={<><Icon name="sign in" /> Sign in</>} position="right" isdropdownitem={"true"} />
                  </>
                }
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu></Container>
    </>
  );
}