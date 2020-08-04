import React from 'react';
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
const CreateRoom=({onClickButton})=>{
    const classes = useStyles();
    let roomId=Math.random().toString(36).replace('0.', '').substr(0, 10);
    return(
        <Container maxWidth="xs">
                <Paper elevation={24} className={classes.paper}>
                <Grid container direction="column" alignItems="center" justify="space-around" >
                            <Typography>
                                Share this RoomId with your friend:
                            </Typography>
                            <TextField style={{maxWidth:'120px'}} className={classes.button} variant='outlined' value={roomId}>
                            </TextField>
                            <Button variant='contained' className={classes.button} onClick={(e)=>{
                                e.preventDefault();
                                window.location.href=`http://localhost:3000/game?playerName=ashu&roomid=${roomId}`
                            }}>
                                Start Game
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

export default CreateRoom;