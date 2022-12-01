import React, { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { SideBlock } from "../components/SideBlock";
import { SideComments } from "../components/SideComments";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data,setData] = useState();
  const [isLoading,setIsLoading] = useState(true);
  const {id}= useParams();

  useEffect(()=>{
    axios.get(`/posts/${id}`).then(res=>{
      setData(res.data)
      setIsLoading(false);
    }).catch(()=>{
      alert("Article fetch error")
    });
  },[])
  if(isLoading){
    return <Post isLoading={isLoading} isFullPost/>
  }
  return (
    <div style={{marginBottom:"32vh"}}>
      <Post
        id={data._id}
        title={data.title}
        imageUrl= {data.imageUrl ? `http://localhost:7000${data.imageUrl}`: ""}
        avatarUrl= {data.avatarUrl.avatarUrl ? `http://localhost:7000${data.avatarUrl.avatarUrl}`: ""}
        user={data.user}
        username={data.username.username}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <SideBlock title="Comments">
        <SideComments id={id}/>
      </SideBlock>
    </div>
  );
};
