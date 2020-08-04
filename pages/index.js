import React,{useState} from 'react';
import {Button,Paper,Grid, Typography,Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import dynamic from 'next/dynamic';
import Landing from '../src/landing'
import JoinRoom from '../src/joinRoom'
import CreateRoom from '../src/createRoom'
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
      width:'70%',
      padding:'15px'
    },
    button:{
      margin:'15px'
    }
});

const Login=()=>{
    const classes = useStyles();
    const [pageType,setPageType]=useState('landing');
    const onClickButton=(type)=>{
      setPageType(type);
    }
    const renderPage=()=>{
      return pageType=='joinRoom' ? <JoinRoom onClickButton={onClickButton}/> : pageType=='createRoom' ? <CreateRoom onClickButton={onClickButton}/> : <Landing onClickButton={onClickButton}/>
    }
    return(
        <div className={classes.root}>
            {renderPage()}
       </div>
    );
}

export default dynamic(() => Promise.resolve(Login), {
    ssr: false,
})