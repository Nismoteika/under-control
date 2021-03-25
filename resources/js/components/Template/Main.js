import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Index';
import AddCard from '../Home/AddCard';

import Login from '../Auth/Login';
import Register from '../Auth/Register';
import UserPage from '../Auth/UserPage';
import PrivateRoute from '../PrivateRoute';
import AdminRoute from '../AdminRoute';

import Devices from '../Device/Index';
import AddDevice from '../Device/AddDevice';

import Cmds from '../Command/Index';
import AddCommand from '../Command/AddCommand';

import UserRoles from '../Admin/UserRoles';

import NotFound from '../Template/NotFound';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        margin: '15px 0'
      },
})

export default function() {
    const classes = useStyles();
    //TODO React lazy
    return (
        <main className={classes.root}>
        <Container maxWidth="md">
        <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/card/add" component={AddCard} />

            <Route exact path="/commands" component={Cmds} />
            <PrivateRoute path="/command/add" component={AddCommand} />

            <AdminRoute exact path="/devices" component={Devices} />
            <PrivateRoute path="/device/add" component={AddDevice} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <PrivateRoute exact path="/user" component={UserPage} />

            <AdminRoute exact path="/usersrole" component={UserRoles} />

            <Route component={NotFound} />
        </Switch>
        </Container>
        </main>
    );
}