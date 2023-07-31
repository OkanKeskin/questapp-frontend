import React ,{useState, useEffect, useRef, useCallback}from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

import Comment from '../Comment/Comment';
import CommentForm from '../Comment/CommentForm';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const linkStyle = {
    textDecoration : "none",
    boxShadow : "none",
    color : "white"
  }

  

function Post(props) {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const [expanded, setExpanded] = React.useState(false);
    const {title, text, userId, userName, postId} = props;
    const [liked, setLiked] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const isInitialMount  = useRef(true);

    const handleExpandClick = () => {
      setExpanded(!expanded);
      refreshComments();
    };

    const handleLike = () => {
        setLiked(!liked);
    }

    const refreshComments = useCallback(() => {
      fetch(apiUrl + "/comments?postId=" + postId)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setCommentList(result)
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [apiUrl, postId]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    else {
      refreshComments();
    }
  }, []);

    return (
      <Card sx={{ maxWidth: 700 }}>
        <CardHeader
          avatar={
            <Link style={linkStyle}  to={{pathname : '/users/' + userId}}>
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                {userName[0].toUpperCase()}
                </Avatar>
            </Link>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={liked? { color: "red" } : null} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon
            />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div>
            {
            error ? <div>Error: {error.message}</div> :
            isLoaded ? 
            commentList.map(comment => (
              <Comment 
              userId={1}
              userName={"User"}
              text={comment.text}
              />
            )) : <div>Loading...</div>
            }
          </div>
          <CommentForm postId={postId} userId = {1} userName={"Okan"}/>
        </Collapse>
      </Card>
    );
}

export default Post