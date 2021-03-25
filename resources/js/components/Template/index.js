import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import Header from '../Template/Header';
import Footer from '../Template/Footer';
import Main from '../Template/Main';

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import { addCard, deleteCard, doCard } from '../../actions/CardAction'; //TODO


const useStyles = makeStyles({
  root: {
    height: '100%'
  },
  itemUp: {
    flex: '1 0 auto'
  },
  itemDown: {
    flex: '0 0 auto'
  }
})

const Index = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let state = localStorage['appState'];
    if (state) {
      let AppState = JSON.parse(state);
      setUser(AppState.user);
      setLoggedIn(AppState.isLoggedIn);
    }
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container direction='column' wrap='nowrap' className={classes.root}>
        <Grid item className={classes.itemUp}>
          <Header userData={user} userIsLoggedIn={isLoggedIn} />
        </Grid>
        <Grid item className={classes.itemUp}>
          <Main />
        </Grid>
        <Grid item className={classes.itemDown}>
          <Footer />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default connect(
  state => ({}),
  dispatch => ({})
)(Index)
