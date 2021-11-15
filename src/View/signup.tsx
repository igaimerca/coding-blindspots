import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import RestClient from '../shared/rest';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import styles from './styles.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    signupBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff',
    },
    card: {
      marginTop: theme.spacing(10),
    },
  })
);

//state type

type State = {
  username: string;
  email: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: '',
  password: '',
  email: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
};

type Action =
  | { type: 'setUsername'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setEmail'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'signupSuccess'; payload: string }
  | { type: 'signupFailed'; payload: string }
  | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload,
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      };
    case 'setEmail':
      return {
        ...state,
        email: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'signupSuccess':
      console.log('in signupSuccess');
      console.log(state);
      console.log(action);
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case 'signupFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload,
      };
  }
};

const Signup = () => {
  const classes = useStyles();

  let history = useHistory();
  const goToPreviousPath = () => {
    const pathname = window.location.pathname;
    if (pathname === '/signup') {
      history.go(-1);
    } else {
      history.go(0);
    }
  };

  // const [cookies, setCookie] = useCookies(["user"]);
  // function handleCookie() {
  //  console.log("about to set cookie");
  //   setCookie("user", "gowtham", {      path: "/"    });
  //  console.log("successfully set cookie");
  // }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.email.trim() && state.password.trim()) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false,
      });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true,
      });
    }
  }, [state.username, state.password, state.email]);

  const handleSignup = () => {
    var credentials = {
      username: state.username,
      password: state.password,
      email: state.email,
    };
    RestClient.post(`/api/v1/users/`, credentials)
      .then((tokenresponse) => {
        console.log(
          'response from django signup server. Good ' + tokenresponse.auth_token
        );

        //This also works.
        // handleCookie();

        //This works fine.
        const cookies = new Cookies();
        cookies.set('user', state.username, { path: '/' });
        console.log(cookies.get('user')); // Pacman

        dispatch({
          type: 'signupSuccess',
          payload: 'signup Succeeded',
        });

        // goToPreviousPath();
        // probably redirect to login?
      })
      .catch(() => {
        //setLoaded(true);
        console.log('failedddddd..');
        dispatch({
          type: 'signupFailed',
          payload: 'signup Failed',
        });
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleSignup();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setUsername',
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setPassword',
      payload: event.target.value,
    });
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setEmail',
      payload: event.target.value,
    });
  };
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Please signup" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.signupBtn}
            onClick={handleSignup}
            disabled={state.isButtonDisabled}
          >
            Signup
          </Button>
        </CardActions>
        {/* <div className={styles.linkToSignUp}>
          If you don't have an account{' '}
          <Link href="./sign-up">Sign up here.</Link>
        </div> */}
      </Card>
    </form>
  );
};

export default Signup;
