import { Avatar, CardContent, InputAdornment, OutlinedInput } from '@mui/material'
import { blue } from '@mui/material/colors';
import React from 'react'
import { Link } from 'react-router-dom';

function Comment(props) {

    const linkStyle = {
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
    }
  const {text,userName,userId} = props;
  return (
    <CardContent>
        <OutlinedInput 
        disabled
        id='outlined-adornment-amount' 
        value={text}
        fullWidth 
        multiline 
        startAdornment={
            <InputAdornment position='start'>
                <Link style={linkStyle}  to={{pathname : '/users/' + userId}}>
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                    {userName[0].toUpperCase()}
                    </Avatar>
                </Link>
            </InputAdornment>
        }
        />
    </CardContent>
  )
}

export default Comment