import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

export default function(props) {
  const classes = useStyles();

  var color = 'itherit';
  
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{ backgroundColor: color }}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.name == undefined ? '?' : props.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.topic == undefined ? '?' : props.topic}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="medium"
          color="secondary"
          onClick={props.cb}
          endIcon={<SendIcon/>}
        >
          Выполнить
        </Button>
      </CardActions>
    </Card>
  );
}
