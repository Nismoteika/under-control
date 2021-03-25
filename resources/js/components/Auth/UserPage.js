import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

const UserPage = (props) => {
    const classes = useStyles();

    const [role, setRole] = useState();
    const [user, setUser] = useState(props.userData);
    useEffect(() => {
      let state = localStorage["appState"];
      if (state) {
        let AppState = JSON.parse(state);
        setUser(AppState.user);

        fetch("/api/roles")
            .then(res => res.json())
            .then(data => {
                data.map((item) => {
                    if(item.id == AppState.user.role_id)
                        setRole({ role_name: item.name, role_scope: item.scope})
                })
            })

        fetch("/api/auth/user", {
            headers: {
              'Authorization': 'Bearer ' + AppState.user.access_token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
      }
    }, [])

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <h3>Страница пользователя</h3>
            <span>Имя: { user ? user.name : ""}</span>
            <span>Логин: { user ? user.username : ""}</span>
            <span>Роль: { role ? role.role_name : ""}</span>
            <span>Scope: { role ? role.role_scope : ""}</span>
        </Grid>
    )
}

export default UserPage;