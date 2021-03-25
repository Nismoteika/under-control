import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function(props) {
  const classes = useStyles();

  var color = 'itherit';
  if(props.value == "-") {
    color = 'rgba(200,200,200,0.5)';
  } else if(props.value == "1") {
    color = 'rgba(100,255,100,0.3)';
  } else if (props.value == "0") {
    color = 'rgba(255,100,100,0.3)';
  }

  return (
    <Card className={classes.root} variant="outlined" 
      style={{ backgroundColor: color }}
      >
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.name == undefined ? "?" : props.name}
        </Typography>
        <Typography variant="h5" component="h2">
            {props.topic == undefined ? "?" : props.topic}
        </Typography>
      </CardContent>
      <CardActions>
        <Switch
          checked={props.value == "1" ? true : false}
          onChange={props.cb}
          name={props.name}
        />
      </CardActions>
    </Card>
  );
}