import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, fetchPosts, fetchTags } from "../redux/slices/posts";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock"
import { DialogWindow } from "../components/DialogWindow";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const {posts, tags, comments} = useSelector(state => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = comments.status === "loading";

  const [value,setValue] = React.useState({num:0});

  React.useEffect(()=>{
    dispatch(fetchTags())
    dispatch(fetchComments())
  },[]);

  React.useEffect(()=>{
    dispatch(fetchPosts(value))
  },[value]);

  const handleChange = (event, newValue) => {
    setValue({num:newValue});
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value.num}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
          <Grid container spacing={4}>
              <Grid xs={12} sm={12} md={8} item>
                {(isPostsLoading ? [...Array(5)]: posts.items).map((obj,index)=>
                  isPostsLoading? <Post key={index} isLoading={true} />:
                    <Post
                      _id={obj._id}
                      title={obj.title}
                      imageUrl={obj.imageUrl ? `http://localhost:7000${obj.imageUrl}` : ''}
                      avatarUrl={obj.avatarUrl ? `http://localhost:7000${obj.avatarUrl.avatarUrl}` : ''}
                      user={obj.user}
                      username={obj.username.username}
                      createdAt={obj.createdAt}
                      viewsCount={obj.viewsCount}
                      commentsCount={obj.commentsCount}
                      tags={obj.tags}
                      isEditable={(userData?._id===obj.user) || (userData?.role==="ADMIN" || (userData?.role==="MODER"))}
                    />
                )}
              </Grid>
          <Grid xs={12} sm={12} md={4} item>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
            <CommentsBlock items = {comments.items} isLoading={isCommentsLoading}/>
            <DialogWindow />
          </Grid>
        </Grid>
    </>
  );
};
