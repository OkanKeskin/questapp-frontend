import React, { useState, useEffect } from "react";
import Post from '../Post/Post'
import './Home.scss'
import PostForm from "../Post/PostForm";

function Home() {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPost = () => {
        fetch(apiUrl + "/posts")
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
    }

    useEffect(() => {
        refreshPost();
    }, [postList]);

    if (error) {
        return <div> Error !!!</div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return (
            <div className="div">
                <div className="cards">
                    <PostForm userId={1} userName={"post.userName"} refreshPost={refreshPost} />
                    {postList.map(post => (
                        <div className="card">
                            <Post
                                className="card"
                                userId={post.userId}
                                userName={post.userName}
                                title={post.title}
                                text={post.text}>
                            </Post>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;