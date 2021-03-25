import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        display: 'flex',
        flexFlow: 'column nowrap',
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    centerBox: {
        margin: '0 auto'
    },
    bottomLine: {
        alignSelf: 'flex-end',
        marginTop: '20px'
    }
  }));

export default function() {
    const classes = useStyles();
    const [commands, setCommands] = useState(null);

    useEffect(() => {
        var user = JSON.parse(localStorage["appState"]).user;
        fetch('/api/commands/'+user.role_id, {
            headers: {
                'Authorization': 'Bearer ' + user.access_token
            }
        })
            .then(res => res.json())
            .then(data => {
                setCommands(data);
                console.log(data);
            })
    }, [])

    if(commands == null)
        return (
            <Grid container justify="center" spacing={2}>
                <Grid item>
                    <CircularProgress className={classes.centerBox} />
                </Grid>
            </Grid>
        )


    return (
        <Grid container direction="column" flexwrap="nowrap" alignItems="center">
            <Grid component={List} item container spacing={2} md={6} >
                {commands.map((command) => (
                    <ListItem button key={command.id}>
                        <ListItemText primary={command.name} secondary={command.topic} />
                    </ListItem>
                ))}
            </Grid>
            <Grid item className={classes.bottomLine}>
                <Link to='/command/add'>
                <Fab color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
                </Link>
            </Grid>
        </Grid>
    )
}