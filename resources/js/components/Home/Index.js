import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mqtt_broker_address } from '../../config';

const MQTT = require("async-mqtt");
const client = MQTT.connect(mqtt_broker_address);
 
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import GetCard from '../Cards/GetCard';
import SetCard from '../Cards/SetCard';
import ToggleCard from '../Cards/ToggleCard';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        display: 'flex',
        flexFlow: 'row wrap',
        margin: theme.spacing(1),
        width: '20ch',
      },
    },
    centerBox: {
        margin: '0 auto'
    },
    bottomLine: {
        alignSelf: 'center',
        marginTop: '20px'
    }
  }));

export default function() {
    const classes = useStyles();

    const [user, setUser] = useState();
    useEffect(() => {
      let state = localStorage["appState"];
      if (state) {
        let AppState = JSON.parse(state);
        setUser(AppState.user);
        if(AppState.isLoggedIn != false) {
            var role = AppState.user.role_id;
            fetch('/api/cards/' + role, {
                    headers: {
                        'Authorization': 'Bearer ' + AppState.user.access_token
                    }
                })
                .then(res => res.json())
                .then(data => {
                    setCards(data);
                })
        }
      }

    }, [])

    const [cardStates, setCardStates] = useState({});

    const [cards, setCards] = useState(null);

    useEffect(() => {
        if(cards != null) {
            subscribeAll();
            getDevicesStatus();
        }
    }, [cards])

    const getDevicesStatus = async () => {
        //get all devices state
        await fetch('/api/devices')
            .then(res => res.json())
            .then(devices => {
                devices.map(async (device) => {
                    await client.publish(device.topic, 'GET_STATE');
                })
            })
    }

    const handleMessage = (topic, msg) => {
        console.log('topic: ' + topic);
        console.log('message: ' + msg);

        cards.map((card) => {
            const device = card.topic_dev;
            const command = card.topic_cmd;
            const fullTopic = device + command;
            
            if(fullTopic == topic) {
                setCardStates(prevState => ({
                    ...prevState,
                    [card.id]: '' + msg
                }));
            }
        })
    }

    const subscribeAll = async () => {
        try {
            var topics = [];

            if(cards != null)
                cards.map((card) => {
                    const device = card.topic_dev;
                    const command = card.topic_cmd;
                    topics.push(device + command);
                })

            await client.subscribe(topics);

            await client.on('message', handleMessage);
        }catch (e){
            console.log("SUB ALL CATCH");
        }
    }

    const doStuff = async (cardId) => {
 
        console.log("Starting");
        try {
            console.log(cardStates);
            var fullTopic, type, action, msg = 0;
            cards.map((card) => {
                if(card.id == cardId) {
                    const device = card.topic_dev;
                    const command = card.topic_cmd;
                    fullTopic = device + command;
                    type = card.type;
                    action = card.action;
                }
            })
            switch(type) {
                case "SET":
                    msg = action;
                    break;
                case "TOGGLE":
                    if(cardStates[cardId] == 0) {
                        msg = "1";
                    } else {
                        msg = "0";
                    }
                    break;
            }

            await client.publish(fullTopic, msg);
        } catch (e){
            console.log("DO STUFF CATCH");
        }
    }
    //     :
    //     <React.Fragment>
    //         <Grid item>
    //             <h3>Нету ни одной карточки, чтобы добавить нажмите +</h3>
    //         </Grid>
    //         <Grid item>
    //             <Link to='/card/add'>
    //                 <Fab color="secondary" aria-label="add">
    //                     <AddIcon />
    //                 </Fab>
    //             </Link>
    //         </Grid>
    //     </React.Fragment>
    // }
    if(cards == null) {
        
        return (
            <Grid container justify="center" align="center" direction="column" flexwrap="nowrap" spacing={2}>
                <Grid container justify="center" align="center" direction="column" flexwrap="nowrap" spacing={2}>
                    <Grid item>
                        <h3>Для добавления карточек нужно авторизироваться</h3>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container direction="column" flexwrap="nowrap">
            <Grid item container spacing={2}>
                {cards.map((card) => {
                    const device = card['topic_dev'];
                    const command = card['topic_cmd'];
                    const fullTopic = device + command;
                    const type = card['type'];
                    switch(type) {
                        case "GET":
                            return (
                                <Grid item xs={6} md={4} key={card.id}>
                                    <GetCard name={card.name} value={cardStates[card.id] ? cardStates[card.id] : "-"} />
                                </Grid>
                            )
                        case "SET":
                            return (
                                <Grid item xs={6} md={4} key={card.id}>
                                    <SetCard name={card.name} topic={fullTopic} cb={doStuff.bind(this, card.id)} />
                                </Grid>
                            )
                        case "TOGGLE":
                            return (
                                <Grid item xs={6} md={4} key={card.id}>
                                    <ToggleCard name={card.name} topic={fullTopic} cb={doStuff.bind(this, card.id)} value={cardStates[card.id] ? cardStates[card.id] : "-"} />
                                </Grid>
                            )
                    }
                })}
            </Grid>
            <Grid item className={classes.bottomLine}>
                <Link to='/card/add'>
                    <Fab color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </Grid>
        </Grid>
    )
}