import React, {useState, useEffect} from "react";
import Post from '../Post/Post'
import './Home.scss'

function Home() {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch(apiUrl+"/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result)
            },
            (error) => {
                console.log(error)
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if(error) {
        return <div> Error !!!</div>;
    } else if(!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return(
            <div className="div">
                <div className="cards">
                    {postList.map(post => (
                        <Post className="card" userId = {post.userId} userName = {post.userName}  title={post.title} text={post.text}></Post>
                    ))}
                </div>
            </div>
            
        );
    }
}

export default Home