import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

  const [user, setUser] = useState(props.userData);
  useEffect(() => {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      setUser(AppState.user);
    }
  }, [])

  const [device, setDevice] = useState('');
  const onDeviceChange = e => {
    setDevice(e.target.value);
  };

  const [topic, setTopic] = useState('');
  const onTopicChange = e => {
    setTopic(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const body = { device: device, topic: topic };

    let response = await fetch('/api/device/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + user.access_token
      },
      body: JSON.stringify(body)
    });

    let result = await response;
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <h3 style={{ textAlign: "center" }}>Новое устройство</h3>
        <form
          onSubmit={onSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Устройство"
            name="device"
            value={device}
            onChange={onDeviceChange}
          />
          <TextField
            id="standard-basic"
            label="Топик"
            name="topic"
            value={topic}
            onChange={onTopicChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Добавить
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
