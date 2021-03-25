import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import SelectInput from '../Form/SelectInput';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      display: 'flex',
      flexFlow: 'column nowrap',
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
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

  const [command, setCommand] = useState('');
  const onCommandChange = e => {
    setCommand(e.target.value);
  };

  const [topic, setTopic] = useState('');
  const onTopicChange = e => {
    setTopic(e.target.value);
  };

  const [action, setAction] = useState('');
  const onActionChange = e => {
    setAction(e.target.value);
  };

  const [role, setRole] = useState('');
  const onRoleChange = e => {
    setRole(e.target.value);
  };

  const [typeCmd, setTypeCmd] = useState('');
  const onTypeCmdChange = e => {
    setTypeCmd(e.target.value);
  };

  const [device, setDevice] = useState('');
  const onDeviceChange = e => {
    setDevice(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const body = { 
      name: command, 
      topic: topic,
      action: action,
      role_id: role,
      type_id: typeCmd,
      device_id: device
    };
    console.log(body);
    let response = await fetch('/api/command/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + user.access_token
      },
      body: JSON.stringify(body)
    });

    let result = await response;
    console.log(result);
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item md={3}>
        <h3 style={{ textAlign: "center" }}>Новая команда</h3>
      <form
        onSubmit={onSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        
        <TextField
          id="standard-basic"
          label="Название команды"
          name="command"
          value={command}
          onChange={onCommandChange}
        />
        <TextField
          id="standard-basic"
          label="Топик"
          name="topic"
          value={topic}
          onChange={onTopicChange}
        />
        <TextField
          id="standard-basic"
          label="Действие"
          name="action"
          value={action}
          onChange={onActionChange}
        />
        <SelectInput item="roles" label="Роль доступа" default="1" cb={onRoleChange.bind(this)} value={role} />
        <SelectInput item="typesCmd" label="Тип команд" cb={onTypeCmdChange.bind(this)} value={typeCmd} />
        <SelectInput item="devices" label="Устройство" cb={onDeviceChange.bind(this)} value={device} />

        <Button type="submit" variant="contained" color="primary">
          Добавить
        </Button>
      </form>
      </Grid>
    </Grid>
  );
}
