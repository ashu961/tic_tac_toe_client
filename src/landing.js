import React from 'react';
import {Button,Paper,Grid, Typography,Container} from '@material-ui/core';
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
const Landing=({onClickButton})=>{
    const classes = useStyles();
    return(
        <Container maxWidth="xs">
                <Paper elevation={24} className={classes.paper}>
                <Grid container direction="column" alignItems="center" justify="space-around" >
                            <Typography>
                                Hello Welcome to Tic Tac Toe
                            </Typography>
                            <Button variant='contained' className={classes.button} onClick={(e)=>{
                                e.preventDefault();
                                onClickButton('createRoom')
                            }}>
                                Create a game
                            </Button>
                            <Button variant='contained' className={classes.button}onClick={(e)=>{
                                e.preventDefault();
                                onClickButton('joinRoom')
                            }}>
                                Join a game
                            </Button>          
                </Grid>
            </Paper>
        </Container>
    )
}

export default Landing;