import { useContext, useRef, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import PasswordReset from './PasswordReset';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [login, setLogin] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const toggleHandler = () => {
    setLogin((prevState) => !prevState);
  };

  const resetPasswordHandler = () => {
    history.push('/auth/password-reset');
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value.trim();

    const information = { email: enteredEmail, password: enteredPassword };

    if (enteredPassword.length > 5 && enteredEmail.includes('@')) {
      authCtx.login(login, information);
      setPasswordIsValid(true);
      setEmailIsValid(true);
    } else if (enteredPassword.length < 6) {
      setPasswordIsValid(false);
      return;
    } else {
      setEmailIsValid(false);
      return;
    }
  };

  let error;

  if (!emailIsValid) {
    error = <p>Email is invalid.</p>;
  }
  if (!passwordIsValid) {
    error = <p>Password is invalid (at least 6 characters required).</p>;
  }
  if (!emailIsValid && !passwordIsValid) {
    error = (
      <p>
        Email and password are invalid (at least 6 characters required for
        password).
      </p>
    );
  }

  return (
    <Switch>
      <Route path='/auth' exact>
        <section className={classes.auth}>
          {(!emailIsValid || !passwordIsValid) && error}
          <h1>{login ? 'Login' : 'Sign Up'}</h1>
          <form onSubmit={submitHandler}>
            <label htmlFor='email'>E-mail</label>
            <input type='email' id='email' required ref={emailInputRef} />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputRef}
            />
            <div className={classes.buttons}>
              <button type='submit'>
                {login ? 'Login' : 'Create Account'}
              </button>
              {login && (
                <button
                  type='button'
                  className={classes.toggle}
                  onClick={resetPasswordHandler}
                >
                  Forgot password?
                </button>
              )}
              <button
                type='button'
                className={classes.toggle}
                onClick={toggleHandler}
              >
                {login ? 'Create new account' : 'Login with existing account'}
              </button>
            </div>
          </form>
        </section>
      </Route>
      <Route path='/auth/password-reset'>
        <PasswordReset />
      </Route>
    </Switch>
  );
};

export default AuthForm;
