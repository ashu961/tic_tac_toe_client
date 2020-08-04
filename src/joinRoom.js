import React, { useState } from 'react';
import {Button,Paper,Grid, Typography,Container,TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    paper: {
      width:'70%',
      padding:'15px'
    },
    button:{
      margin:'15px'
    }
});
const JoinRoom=({onClickButton})=>{
    const classes = useStyles();
    const [roomId,setRoomId]=useState('');
    return(
        <Container maxWidth="xs">
                <Paper elevation={24} className={classes.paper}>
                <Grid container direction="column" alignItems="center" justify="space-around" >
                            <Typography>
                                Please Enter the RoomId
                            </Typography>
                            <TextField label="Room ID" variant="outlined" value={roomId} onChange={(e)=>{e.preventDefault();setRoomId(e.target.value)}} className={classes.button}/>
                            <Button variant='contained' className={classes.button} onClick={(e)=>{
                                e.preventDefault();
                                window.location.href=`http://localhost:3000/game?playerName=ashu&roomid=${roomId}&invite=true`
                            }}>
                                Join the game
                            </Button>
                            <Button variant='contained' className={classes.button} onClick={(e)=>{
                                e.preventDefault();
                                onClickButton('landing');
                            }}>
                                Go Back
                            </Button>           
                </Grid>
            </Paper>
        </Container>
    )
}

export default JoinRoom;