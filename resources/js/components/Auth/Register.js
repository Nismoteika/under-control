import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

export default function(props) {
  const classes = useStyles();

  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(props.userIsLoggedIn);
  const [isRegistered, setIsRegistered] = useState(false);

  const [name, setName] = useState('');
  const onNameChange = e => {
    setName(e.target.value);
  };

  const [login, setLogin] = useState('');
  const onLoginChange = e => {
    setLogin(e.target.value);
  };

  const [password, setPassword] = useState('');
  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const [passwordR, setPasswordR] = useState('');
  const onPasswordRChange = e => {
    setPasswordR(e.target.value);
  };

  useEffect(() => {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      setUser(AppState.user);
      setLoggedIn(AppState.isLoggedIn);
    }
    if (isRegistered) {
      return this.props.history.push("/device/add");
    }
  }, [])

  const onSubmit = async e => {
    e.preventDefault();
    setFormSubmitting(true);
    if(password != passwordR) {
      alert("Пароли не совпадают");
      return;
    }
    await setUser({ username: login, password: password});
    let userData = {
      name: name,
      username: login,
      password: password,
      password_confirmation: passwordR
    };
    await axios
      .post('/api/auth/register', userData)
      .then(res => {
        if(res.status == 201) {
          setIsRegistered(true);
        } else {
          alert(`Ошибка регистрации!Что то пошло не так`);
        }
      })
      .then(json => {
        if (json.message) {
          alert(json.message)
        } else {
            alert(``);
        }
  }).catch(err => {if (error.response) {
        let er = err.response.data;
        setError(er.message);
        setFormSubmitting(false);

      }
      else if (err.request) {
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
  }).finally(setError(''));
};

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <h3 style={{ textAlign: "center" }}>Регистрация</h3>
        <form
          onSubmit={onSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Имя"
            name="name"
            value={name}
            onChange={onNameChange}
          />
          <TextField
            id="standard-basic"
            label="Логин"
            name="login"
            value={login}
            onChange={onLoginChange}
          />
          <TextField
            id="standard-basic"
            label="Пароль"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
          <TextField
            id="standard-basic"
            label="Повтор пароля"
            name="password_confirmation"
            type="password"
            value={passwordR}
            onChange={onPasswordRChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Зарегистрироваться
          </Button>
        </form>
        {isRegistered && 
          <h3 style={{ textAlign: "center" }}>Регистрация прошла успешно</h3>
        }
      </Grid>
    </Grid>
  );
}
