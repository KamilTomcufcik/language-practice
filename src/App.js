import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import MyListPage from './pages/MyListPage';
import PracticePage from './pages/PracticePage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/my-list'>
            <MyListPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/practice'>
            <PracticePage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/profile'>
            <ProfilePage />
          </Route>
        )}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
