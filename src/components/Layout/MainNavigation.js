import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Language Practice</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <Fragment>
              <li>
                <Link to='/practice'>Practice</Link>
              </li>
              <li>
                <Link to='/my-list'>My List</Link>
              </li>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={authCtx.logout}>Logout</button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
