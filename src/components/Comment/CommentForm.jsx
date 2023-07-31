import React ,{useState}from 'react'
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {Button } from '@mui/material';

  const linkStyle = {
    textDecoration : "none",
    boxShadow : "none",
    color : "white"
  }


function CommentForm(props) {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const {postId, userId,userName} = props;
    const [text, setText] = useState('');

    const saveComment = () => {
        const comment = {
            postId : postId,
            userId : userId,
            text : text
        }
        fetch(apiUrl+"/comments",{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(comment)
        })
        .then(res => res.json())
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
    }

    const handleText = (e) => {
        setText(e);
    }
    
  
    return (

      <div>
        <Card>
        <OutlinedInput 
        id='outlined-adornment-amount' 
        value={text}
        fullWidth 
        multiline 
        onChange={(i) => handleText(i.target.value)}
        inputProps={{maxLenght: 250}}
        startAdornment={
            <InputAdornment position='start'>
                <Link style={linkStyle}  to={{pathname : '/users/' + userId}}>
                    <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
                    {userName[0].toUpperCase()}
                    </Avatar>
                </Link>
            </InputAdornment>
        }
        endAdornment={
            <InputAdornment position='end'>
                <Button
                variant='contained'
                onClick={handleSubmit}
                >Yorum yap</Button>
            </InputAdornment>
        }
        />
    </Card>
        {/* <Card sx={{ maxWidth: 700 }}>
            <CardHeader
            avatar={
                <div style={{display:"flex" , width: '100%'}}>
                <Link style={linkStyle}  to={{pathname : '/users/' + userId}}>
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                    {userName[0].toUpperCase()}
                    </Avatar>
                </Link>
                <OutlinedInput
                id='outlined-adornment-amount' 
                value={text}
                multiline placeholder='Text' 
                inputProps={{maxLenght: 250}} 
                fullWidth
                onChange={(i) => handleText(i.target.value)}
                endAdornment={
                    <InputAdornment position='end'>
                        <Button
                        variant='contained'
                        onClick={handleSubmit}
                        >Yorum yap</Button>
                    </InputAdornment>}
                />  
                </div>
                
            }
            
            />
            
        </Card> */}
      </div>
      
    );
}

export default CommentForm