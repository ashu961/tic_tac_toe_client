import React from 'react';
import {Button} from '@material-ui/core';
const Square=({value,takeStep,won})=>{
    return(
        <Button 
            // variant='outlined'
            variant={`${won ? 'contained' : 'outlined' }`}
            color={`${!value ? 'default' : value==='O' ? 'primary' : 'secondary'}`}
            style={{height:'90px',width:'90px',fontSize:'40px',margin:'2px'}} 
            onClick={(e)=>{
                e.preventDefault();
                takeStep();
            }}

        >
            {value}
        </Button>
    );
}

export default Square;