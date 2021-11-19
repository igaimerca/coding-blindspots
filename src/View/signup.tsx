import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import styles from './styles.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

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
  const [error, setError] = useState('');
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    //   .min(6, 'Username must be at least 6 characters')
    //   .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
    //   .min(6, 'Password must be at least 6 characters')
    //   .max(40, 'Password must not exceed 40 characters'),
    // confirmPassword: Yup.string()
    //   .required('Confirm Password is required')
    //   .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    // control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const classes = useStyles();

  const redirectToMain = () => {
    const pathname = window.location.pathname;
    if (pathname === '/signup') {
      window.location.href = '/public';
    }
  };

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

  const handleSignup = async () => {
    let credentials = {
      username: state.username,
      password: state.password,
      email: state.email,
    };

    axios
      .post(
        `https://backend.interviewblindspots.com/displaycode/api/v1/users/`,
        credentials
      )
      .then((response) => {
        if (response) {
          dispatch({
            type: 'signupSuccess',
            payload: 'Signup succeeded',
          });
          redirectToMain();
        }
      })
      .catch((error) => {
        const errorResponse = Object.values(error.response.data)[0];
        setError(`${errorResponse}`);
        dispatch({
          type: 'setIsError',
          payload: true,
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
              required
              error={state.isError}
              fullWidth
              id="username"
              type="username"
              label="Username"
              placeholder="Username"
              margin="normal"
              {...register('username')}
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              required
              error={state.isError}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              {...register('email')}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              required
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              {...register('password')}
              helperText={error}
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
            onClick={handleSubmit(handleSignup)}
            disabled={state.isButtonDisabled}
          >
            Signup
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Signup;
