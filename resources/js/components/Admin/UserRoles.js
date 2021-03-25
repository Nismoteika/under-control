import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
  },
  table: {
    width: '100%'
  },
  alert: {
    marginTop: '20px'
  }
})

const UserRoles = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [usersList, setUsersList] = useState(false);

  const [rolesList, setRolesList] = useState([]);
  const [rolesValue, setRolesValue] = useState({});
  const onRoleChange = (e) => {
    var user_id = e.target.name.slice(1);
    var role_id = e.target.value;
    fetch('/api/usersrole/update/'+user_id+"/"+role_id, {
      headers: {
        'Authorization': 'Bearer ' + user.access_token
      }
    })
      .then(res => res.json())
      .then(data => {
        setAlertView(true);
        setTimeout(() => {
          setAlertView(false);
        }, 2500);
      })
    const obj = {
      user_id: user_id,
      role_id: role_id
    }
    setRolesValue({...rolesValue, [user_id]: obj});
    console.log(rolesValue);
  }

  const getListRoles = rolesList.map((item) => {
    return (
      <MenuItem value={item.id} key={item.id}>
        {item.name}
      </MenuItem>
    );
  });

  const [alertView, setAlertView] = useState(false);

  useEffect(() => {
    let state = localStorage['appState'];
    if (state) {
      let AppState = JSON.parse(state);
      setUser(AppState.user);
      setLoggedIn(AppState.isLoggedIn);

      fetch('/api/roles')
        .then(res => res.json())
        .then(data => {
          setRolesList(data);
        })

      fetch('/api/usersrole', {
        headers: {
          'Authorization': 'Bearer ' + AppState.user.access_token
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setUsersList(data);
        })
    }

  }, [])

  return (
      <Grid container direction='column' wrap='nowrap' alignItems='center' className={classes.root}>
        <Grid item md={6}>
          <h3>Управление ролями пользователей</h3>
        </Grid>
        <Grid item md={6}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Имя</TableCell>
                  <TableCell align="right">Логин</TableCell>
                  <TableCell align="right">Роль</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersList && usersList.map((user) => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell align="right">{user.username}</TableCell>
                      <TableCell align="right">
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="select-label"
                            id="select-placeholder-label"
                            displayEmpty
                            value={rolesValue[user.id] ? rolesValue[user.id]['role_id'] : ""}
                            name={"u"+user.id}
                            onChange={onRoleChange}
                          >
                            <MenuItem value="" disabled>
                              {user.role}
                            </MenuItem>
                            {rolesList != [] ? getListRoles : null}
                          </Select>
                          <FormHelperText>{user.role}</FormHelperText>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  )
              })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={6}>
              {alertView && 
                <Alert severity="success" className={classes.alert}>Роль успешно обновлена</Alert>
              }
        </Grid>
      </Grid>
  )
}

export default UserRoles;