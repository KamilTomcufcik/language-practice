import { useRef, useState } from 'react';
import classes from './PasswordReset.module.css';

const PasswordReset = () => {
  const emailInputRef = useRef();
  const [emailSent, setEmailSent] = useState();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value.trim();

    const res = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyASFNrswDBzzXPvN6jYmHqaTXQOBea4ajA',
      {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: enteredEmail,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }
    );

    try {
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error.message);
      } else {
        setEmailSent(true);
        emailInputRef.current.value = '';
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className={classes.passwordReset}>
      <h1>Password Reset</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          type='email'
          id='email'
          required
          placeholder='Enter email'
          ref={emailInputRef}
        />
        <button type='submit'>Confirm</button>
      </form>
      {emailSent && <p>Password reset email successfully sent</p>}
    </section>
  );
};

export default PasswordReset;
