import React from "react";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsWithTag } from "../../redux/slices/posts";
import { Post } from "../../components/Post";

export const TagsPage = () => {
  const params = useParams();
  React.useEffect(()=>{
    dispatch(fetchPostsWithTag(params.name))
  },[]);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts } = useSelector(state => state.posts);
  const isPostsLoading = posts.status === "loading";
  return (
    <div style={{minHeight:"82vh"}}>
      <h2 >#{params.name.toUpperCase()}</h2>
      <Grid container spacing={2}>
          {(isPostsLoading ? [...Array(6)]: posts.items).map((obj,index)=>
            isPostsLoading? <Post key={index} isLoading={true} />:
              <Grid style={{marginTop:"-8px"}} xs={12} sm={6} item>
                <Post
                  _id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl ? `http://localhost:7000${obj.imageUrl}` : ''}
                  avatarUrl={obj.avatarUrl.avatarUrl ? `http://localhost:7000${obj.avatarUrl.avatarUrl}` : ''}
                  user={obj.user}
                  username={obj.username.username}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj.commentsCount}
                  tags={obj.tags}
                  isEditable={(userData?._id===obj.user) || (userData?.role==="ADMIN") || (userData?.role==="MODER")}
                />
              </Grid>
          )}
      </Grid>
    </div>
  );
};

