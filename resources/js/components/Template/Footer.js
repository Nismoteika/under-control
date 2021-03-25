import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    copyright: { 
        backgroundColor: '#cfe8fc',
        padding: '10px',
        textAlign: 'center' 
    }
})

export default function() {
    const classes = useStyles();
    
    return (
        <footer>

                <Typography component="div" className={classes.copyright}>
                    UnderControl 2020
                </Typography>

        </footer>
    );
}