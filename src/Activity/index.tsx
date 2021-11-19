import React from 'react';
import styles from './styles.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

export function Activity() {
  const cookies = new Cookies();
  const tokenCookie = cookies.get('token'); // Pacman

  axios
    .get(
      `https://backend.interviewblindspots.com/displaycode/api/v1/users/me/`,
      {
        headers: {
          Authorization: `Token ${tokenCookie}`,
        },
      }
    )
    .then((response) => {
      if (response) {
        console.log('response', response);
      }
    })
    .catch((error) => {
      console.log(Object.values(error.response.data)[0]);
      const errorResponse = Object.values(error.response.data)[0];
      // dispatch({
      //   type: 'signupFailed',
      //   payload: 'signup Failed',
      // });
    });

  return (
    <div className={styles.container}>
      <button onClick={() => console.log(`tokenCookie`, tokenCookie)}>
        Token
      </button>
      <h2>Display snippets posted by user.</h2>
      <h2>Display comments made by user.</h2>
    </div>
  );
}
