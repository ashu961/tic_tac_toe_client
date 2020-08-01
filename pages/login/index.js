import React from 'react';
import {Button,Paper,Grid, Typography,Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import dynamic from 'next/dynamic';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: typeof window !== 'undefined' ? window.innerHeight : '-webkit-fill-available',
        background: 'linear-gradient(90deg, rgba(191,80,80,1) 0%, rgba(46,57,193,1) 90%)'
    },
    paper: {
        width: '100%',
        padding: '0px',
        textAlign: 'center',
        position: 'relative',
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: '10px',
    },
});


const Login=()=>{
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Container maxWidth="xs">
                <Paper elevation={24} className={classes.paper}>
                <Grid container>
                        <Grid item md={12} xs={12}>
                            <Typography>
                                Login/Register
                            </Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Button variant='contained'>
                                Login with Google
                            </Button>
                        </Grid>
                </Grid>
            </Paper>
            </Container>
       </div>
    );
}

export default dynamic(() => Promise.resolve(Login), {
    ssr: false,
})