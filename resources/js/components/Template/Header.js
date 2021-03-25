import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import RouterIcon from '@material-ui/icons/Router';
import TextsmsIcon from '@material-ui/icons/Textsms';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';


const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkText: {
    color: theme.palette.text.secondary,
    textDecoration: 'none'
  }
}));

const Header = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [user, setUser] = useState(props.userData);
  const [isLoggedIn, setLoggedIn] = useState(props.userIsLoggedIn);
  const logOut = () => {
    fetch('/api/auth/logout', {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage["appState"]).user.access_token
      }
    });
    let appState = {
      isLoggedIn: false,
      user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
    setUser({});
    setLoggedIn(false);
    location.reload();
    props.push('/');
  }

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const listMenuItems = [
    { name: "Главная", href: "/", icon: <HomeIcon />, admin: "no" },
    { name: "Команды", href: "/commands", icon: <TextsmsIcon />, admin: "no" },
    { name: "Устройства", href: "/devices", icon: <RouterIcon />, admin: "yes" },
    { name: "Роли пользователей", href: "/usersrole", icon: <SupervisedUserCircle />, admin: "yes" }
  ];

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {listMenuItems.map((item, index) => {
          if(item.admin == "yes" && JSON.parse(localStorage["appState"]).user.role_id != 1) {
            return null;
          }
          return (
            <Link to={item.href} key={index} className={classes.linkText} onClick={handleDrawerToggle}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name}/>
            </ListItem>
            </Link>
          )
        })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={handleDrawerToggle} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            UnderControl
          </Typography>
          {props.userIsLoggedIn && 
            <React.Fragment>
              <Button component={Link} to="/user" color="inherit">{props.userData.name}</Button>
              <Button color="inherit" onClick={logOut.bind(this)}>Выйти</Button>
            </React.Fragment>
          }
          {!props.userIsLoggedIn &&
            <React.Fragment>
              <Button color="inherit" component={Link} to="/login">Войти</Button>
              <Button color="inherit" component={Link} to="/register">Регистрация</Button>
            </React.Fragment>
          }
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Drawer
          container={container}
          variant="temporary"
          anchor={'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </header>
  );
}

export default connect(null, { push })(Header);