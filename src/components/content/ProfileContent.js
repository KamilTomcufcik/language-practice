import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileContent.module.css';

const ProfileContent = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const passwordInputRef = useRef();
  const [newPasswordIsValid, setNewPasswordIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value.trim();

    if (enteredPassword.length > 5) {
      authCtx.changePassword(enteredPassword);
      setNewPasswordIsValid(true);
      history.push('/');
    } else {
      setNewPasswordIsValid(false);
      return;
    }
  };

  const error = <p>Password is invalid (at least 6 characters required).</p>;

  return (
    <section className={classes.profile}>
      {!newPasswordIsValid && error}
      <h1>Password Change</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          type='password'
          id='password'
          required
          placeholder='Enter new password'
          ref={passwordInputRef}
        />
        <button type='submit'>Change Password</button>
      </form>
    </section>
  );
};

export default ProfileContent;
