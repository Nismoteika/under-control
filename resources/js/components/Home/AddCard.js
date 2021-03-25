import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';
import SelectInput from '../Form/SelectInput';

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

  const [alertView, setAlertView] = useState(false);

  const [user, setUser] = useState();
  useEffect(() => {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      setUser(AppState.user);

      fetch('/api/commands/'+AppState.user.role_id, {
        headers: {
          'Authorization': 'Bearer ' + AppState.user.access_token
        }
      })
        .then(res => res.json())
        .then(data => {
          setListCommands(data);
        })
    }
  }, [])

  const [listCommands, setListCommands] = useState([]);
  const getListCommands = listCommands.map(item => {
    return (
      <MenuItem value={item.id} key={item.id}>
        {item.name}
      </MenuItem>
    );
  });

  const [card, setCard] = useState('');
  const onCardChange = e => {
    setCard(e.target.value);
  };

  const [command, setCommand] = useState('');
  const onCommandChange = e => {
    setCommand(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const body = {
      name: card,
      command_id: command
    };
    console.log(body);
    let response = await fetch('/api/card/add/'+user.role_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + user.access_token
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        setAlertView(true);
        setTimeout(() => {
          setAlertView(false);
        }, 2500);
      })
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <h3 style={{ textAlign: "center" }}>Новая карточка</h3>
        <form
          onSubmit={onSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Название карточки"
            name="card"
            value={card}
            onChange={onCardChange}
          />

          <FormControl className={classes.formControl}>
            <InputLabel id="select-label">
              Команда
            </InputLabel>
            <Select
              labelId="select-label"
              id="select-placeholder-label"
              value={command}
              onChange={onCommandChange.bind(this)}
            >
              {listCommands != [] ? getListCommands : null}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Добавить карточку
          </Button>
        </form>
      </Grid>
      <Grid item md={6}>
              {alertView && 
                <Alert severity="success" className={classes.alert}>Карточка успешно добавлена</Alert>
              }
        </Grid>
    </Grid>
  );
}
