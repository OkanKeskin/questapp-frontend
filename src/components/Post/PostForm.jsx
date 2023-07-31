import React ,{useState}from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

  const linkStyle = {
    textDecoration : "none",
    boxShadow : "none",
    color : "white"
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

function PostForm(props) {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const {userId, userName, refreshPost} = props;
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        const post = {
            userId : userId,
            title : title,
            text : text
        }
        fetch(apiUrl+"/posts",{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(post)
        })
        .then(res => res.json())
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPost();
    }

    const handleTitle = (e) => {
        setTitle(e);
        setIsSent(false);
    }

    const handleText = (e) => {
        setText(e);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsSent(false);
    };
    
  
    return (

      <div>
        <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Gönderiniz oluşturuldu
            </Alert>
        </Snackbar>
        <Card sx={{ maxWidth: 700 }}>
            <CardHeader
            avatar={
                <Link style={linkStyle}  to={{pathname : '/users/' + userId}}>
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                    {userName[0].toUpperCase()}
                    </Avatar>
                </Link>
            }
            title={<OutlinedInput 
                id='outlined-adornment-amount' 
                value={title}
                fullWidth 
                multiline 
                placeholder='Title' 
                inputProps={{maxLenght: 250}} 
                onChange={(i) => handleTitle(i.target.value)}
                />}
            />
            <CardContent>
            <Typography variant="body2" color="text.secondary">
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
                        >Gönder</Button>
                    </InputAdornment>}
                />
            </Typography>
            </CardContent>
        </Card>
      </div>
      
    );
}

export default PostForm