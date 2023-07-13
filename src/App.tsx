import React, { useEffect } from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import { Pages } from './shared/Pages';
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignIn } from './routes/SignIn/SignIn';
import { NavBar } from './navbar/NavBar';
import { Logout } from './routes/Logout/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './routes/Home/Home';
import { Settings } from './routes/Settings/Settings';
import { Comments } from './routes/Comments/Comments';

function App() {
  useEffect(() => {

  })
  return (
    <>
      <div>
        <NavBar />
        <Container>
          <Routes>
            <Route path={`/`} element={<Navigate to={`/${Pages.SignIn}`} />} />
            <Route path={`/${Pages.SignIn}`} element={<SignIn />} />
            <Route path={`/${Pages.Home}`} element={<Home />} />
            <Route path={`/${Pages.Settings}`} element={<Settings />} />
            <Route path={`/${Pages.Logout}`} element={<Logout />} />
            <Route path={`/${Pages.Comments}`} element={<Comments />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

