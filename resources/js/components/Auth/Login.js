import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      display: 'flex',
      flexFlow: 'column nowrap',
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const Login = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(props.userIsLoggedIn);

  const [username, setUsername] = useState('');
  const onUsernameChange = e => {
    setUsername(e.target.value);
  };

  const [password, setPassword] = useState('');
  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    let state = localStorage['appState'];
    if (state) {
      let AppState = JSON.parse(state);
      setUser(AppState.user);
      setLoggedIn(AppState.isLoggedIn);
      console.log(props);
      if (AppState.isLoggedIn) {
        setTimeout(() => {
          if(props.location.state == undefined) {
            props.push("/");
          } else {
            props.push(props.location.state.prevLocation);
          }
        }, 1000);
      }
    }
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    console.log("submitted");
    setFormSubmitting(true);
    let userData = {
      username: username,
      password: password
    };
    await axios
      .post('/api/auth/login', userData)
      .then(res => res)
      .then(json => {
        console.log(json);
        if (json.data.access_token) {
          let userDataNew = {
            id: json.data[0].id,
            name: json.data[0].name,
            username: json.data[0].username,
            role_id: json.data[0].role_id,
            access_token: json.data.access_token
          };
          let appState = {
            isLoggedIn: true,
            user: userDataNew
          };
          console.log(appState);
          localStorage['appState'] = JSON.stringify(appState);
          setLoggedIn(appState.isLoggedIn);
          setUser(appState.user);
          location.reload();
        } else {
          alert(`Ошибка аутентификации!`);
        }
      })
      .catch(err => {
        if (error.response) {
          let er = err.response.data;
          setError(er.message);
          setFormSubmitting(false);
        } else if (err.request) {
          // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
          let er = err.request;
          setError(er);
          setFormSubmitting(false);
        } else {
          // Something happened in setting up the request that triggered an Error
          let er = err.message;
          setError(er);
          setFormSubmitting(false);
        }
      })
      .finally(setError(''));
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <h3 style={{ textAlign: 'center' }}>Авторизация</h3>
        {!isLoggedIn && 
        <form
          onSubmit={onSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Логин"
            name="username"
            value={username}
            onChange={onUsernameChange}
          />
          <TextField
            id="standard-basic"
            label="Пароль"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Войти
          </Button>
        </form>
        }
        {isLoggedIn && 
          <h3 style={{ textAlign: 'center', color: 'green' }}>Авторизация прошла успешно</h3>
        }
      </Grid>
    </Grid>
  );
}

export default connect(null, { push })(Login);