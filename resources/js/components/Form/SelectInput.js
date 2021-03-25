import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
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
  const [listItems, setListItems] = useState([]);
  const getListItems = listItems.map(item => {
    return (
      <MenuItem value={item.id} key={item.id}>
        {item.name}
      </MenuItem>
    );
  });

  useEffect(() => {
    //get list roles
    fetch('/api/' + props.item)
      .then(res => res.json())
      .then(res => {
        setListItems(res);
        if(props.default) {
            var e = { target: { value: props.default } };
            props.cb(e);
        }
      });
  }, []);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">
        {props.label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select-placeholder-label"
        value={props.value}
        onChange={props.cb}
      >
        {listItems != [] ? getListItems : null}
      </Select>
    </FormControl>
  );
}
