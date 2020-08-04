import React,{useState,useEffect, Profiler} from 'react';
import Square from '../../src/squares';
import {Paper, Grid, Button, Container, Avatar, Typography, Dialog, DialogTitle, DialogContent, DialogActions,CircularProgress,Backdrop} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import dynamic from 'next/dynamic';
import io from "socket.io-client";
import queryString from 'query-string';

// import vs from '../../public/vs_logo.png';
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
    backdrop: {
        zIndex: 999,
        color: '#fff',
      },
});
let socket;
const Board=({user})=>{
    const { playerName, roomid, invite } = queryString.parse(window.location.search);
    const classes = useStyles();
    const [boardSquares,setBoardSquares]=useState(Array(9).fill(null));
    const [isXNext,setIsXNext]=useState(true);
    const [playerCharacter,setPlayerCharacter]=useState(invite && invite=='true'? 'O':'X');
    const [winningSquares,setWinningSquares]=useState([]);
    const [status,setStatus]=useState('');
    const [showPopup,setShowPopup]=useState(false);
    const [room, setRoom] = useState(roomid);
    const [name, setName] = useState(playerName);
    const [waiting,setWaiting]=useState(invite && invite=='true'? true : false);
    const [isPlayer2,setIsPlayer2]=useState(invite && invite=='true'? true : false);
    const [gameData, setGameData] = useState({});

    const takeStep=(index,opponent=false)=>{
        let squares=[...boardSquares];
        if(squares[index] || calculateWinner(boardSquares)){
            return;
        }
        setIsXNext(!isXNext);
        if(!opponent){
            squares[index]=playerCharacter;
            setBoardSquares(squares);
            setWaiting(true);
            socket.emit('turnPlayed',{index,by:user.name,room},(error)=>{
                if(error){
                    console.log(error)
                }
            })
        }else{
            squares[index]=playerCharacter=='X' ? 'O' : 'X';
            setBoardSquares(squares);
            setWaiting(false);
        }
    };

    useEffect(()=>{
        socket = io('http://localhost:3001/');
        socket.emit('join', { googleID:user.sub,room,player1:!isPlayer2 }, (error) => {
            if(error) {
              console.log(error)
            }
          });
    },[]);

    useEffect(()=>{
        socket.on('gameData', (message) => {
            console.log('called')
            setGameData(message.gameData);
          });
    },[boardSquares]);

    useEffect(() => {
        ////
        let winner=calculateWinner(boardSquares);
        if(winner) setWaiting(false);
        if(!winner && !boardSquares.includes(null)){
            setStatus('DRAW');
            setWaiting(false);
            setShowPopup(true);
            return;
        };
        setStatus(winner ? `The Winner is ${winner}` : isXNext ? `X's Turn` : `O's Turn`);
      },[boardSquares]);
    
    
    useEffect(() => {
        socket.on('opponentsPlay', message => {
            console.log('sn')
        if(message.by==user.name){
            return;
        }else if(boardSquares.includes(message.index)){
            return;
        }
        takeStep(message.index,true)
    });
    }, [boardSquares,name,roomid]);

    const renderSquare=(index)=>{
       return <Square value={boardSquares[index]} takeStep={()=>takeStep(index)} won={winningSquares.length>0 && winningSquares.includes(index) ? true : false}/>
    }


    const calculateWinner=(squares)=>{
        const winningLines=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]
        for(let i=0;i<winningLines.length;i++){
            let [a,b,c]=winningLines[i];
            if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c]){
                setWinningSquares([a,b,c]);
                setIsXNext(!isXNext);
                setShowPopup(true);
                return squares[a];
            }
        }
        return null;
    }
    return(
        <div className={classes.root}>
            <Container fixed style={{width:'370px'}}>
                <Grid container spacing={2} style={{textAlign:'center'}}>
                    <Grid item md={12} xs={12} md={12} style={{textAlign:'start',display:'flex'}}>
                        <div style={{display:'flex'}}>
                        <Avatar style={{borderStyle:'solid',border:'3px solid red'}} src={gameData && gameData.playerOne ? gameData.playerOne.userDetails.picture : null} />
                        <div style={{padding:'0px 10px'}}>
                        <Typography style={{textTransform:'capitalize'}}>
                            {gameData && gameData.playerOne ? gameData.playerOne.userDetails.name.toLowerCase() : 'Player1' }
                        </Typography>
                        <Typography style={{fontSize:'14px'}}>
                            {`Level : 1`}
                        </Typography>
                        </div>
                        </div>
                    </Grid>
                    <Grid item md={12} xs={12} md={12} style={{textAlign:'center',padding:'0px'}}>
                        <img src='/vs_logo.png' style={{height:'50px',width:'50px',padding:'0px' }}/>
                    </Grid>
                    <Grid item md={12} xs={12} md={12} style={{flexDirection:'row-reverse',display:'flex'}}>
                    <div style={{display:'flex',flexDirection:'row-reverse'}}>
                        <Avatar style={{borderStyle:'solid',border:'3px solid blue'}} src={gameData && gameData.playerTwo ? gameData.playerTwo.userDetails.picture : null} />
                        <div style={{padding:'0px 10px'}}>
                        <Typography style={{textTransform:'capitalize'}}>
                            {gameData && gameData.playerTwo ? gameData.playerTwo.userDetails.name.toLowerCase() : 'Player2' }
                        </Typography>
                        <Typography style={{textAlign:'end',fontSize:'14px'}}>
                            {`Level : 1`}
                        </Typography>
                        </div>
                        </div> 
                    </Grid>
                     <Grid item md={12} xs={12} md={12}>
                        <Button variant="contained" color={`${isXNext ? 'secondary' : 'primary'}`} >
                                {status}
                        </Button>
                    </Grid>
                    <Grid item md={12} xs={12} md={12}>
                        <Paper elevation={24} className={classes.paper}>
                            <div>{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
                            <div>{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
                            <div>{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
                        </Paper>
                    </Grid>
                    <Grid item md={12} xs={12} md={12} >
                        <Button variant="contained" color='default' onClick={()=>{window.location.reload();}}>
                            {'reset game'}
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Dialog open={showPopup}>
                <DialogTitle>{'GAME OVER!!'}</DialogTitle>
                <DialogActions>
                        <Button color='secondary' onClick={()=>{window.location.reload();}}>
                            {'Leave'}
                        </Button>
                        <Button color='primary' onClick={()=>{window.location.reload();}}>
                            {'Continue'}
                        </Button>
                </DialogActions>
            </Dialog>
            <Backdrop className={classes.backdrop} open={waiting}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'156px'}}>
                    <Typography>
                        {`Waiting for ${invite ? 'Player1 \'s' : 'Player2 \'s' } turn`}
                    </Typography>
                    <CircularProgress style={{marginTop:'7px'}} color="inherit" />
                    </div>
            </Backdrop>
        </div>
    );
}

export default dynamic(() => Promise.resolve(Board), {
    ssr: false,
})
