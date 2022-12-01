import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios";


export const fetchPosts = createAsyncThunk("posts/fetchPosts",async (params)=> {
    const { data } = await axios.post("/posts",params);
    return data;
})
export const fetchTags = createAsyncThunk("posts/fetchTags",async ()=> {
  const { data } = await axios.get("/tags");
  return data;
})
export const fetchComments = createAsyncThunk("posts/fetchComments",async ()=> {
  const { data } = await axios.get("/comments");
  return data;
})
export const fetchCommentsByPost = createAsyncThunk("posts/fetchCommentsByPost",async (id)=> {
  const { data } = await axios.get(`/comment/${id}`);
  return data;
})
export const fetchPostsWithTag = createAsyncThunk("posts/fetchPostsWithTag",async (name)=> {
  const { data } = await axios.get(`/tags/${name}`);
  return data;
})
export const fetchUsers = createAsyncThunk("posts/fetchUsers",async ()=> {
  const { data } = await axios.get("/users");
  return data;
})
export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", (id)=> {
  axios.delete(`/posts/${id}`);
})
const initialState = {
  posts:{
    items:[],
    status:"loading"
  },
  tags:{
    items:[],
    status:"loading"
  },
  users:{
    items:[],
    status:"loading"
  },
  comments:{
    items:[],
    status:"loading"
  }
}

const postSlice = createSlice({
  name:"posts",
  initialState,
  reducers:{},
  extraReducers: {
    //receiving posts
    [fetchPosts.pending]:(state)=>{
      state.posts.items = [];
      state.posts.status = "loading"
    },
    [fetchPosts.fulfilled]:(state,action)=>{
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]:(state)=>{
      state.posts.items = [];
      state.posts.status = "error"
    },
    //receiving tags
    [fetchTags.pending]:(state)=>{
      state.tags.items = [];
      state.tags.status = "loading"
    },
    [fetchTags.fulfilled]:(state,action)=>{
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]:(state)=>{
      state.tags.items = [];
      state.tags.status = "error"
    },
    //receiving comments
    [fetchComments.pending]:(state)=>{
      state.comments.items = [];
      state.comments.status = "loading"
    },
    [fetchComments.fulfilled]:(state,action)=>{
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchComments.rejected]:(state)=>{
      state.comments.items = [];
      state.comments.status = "error"
    },
    //receiving comment by post
    [fetchCommentsByPost.pending]:(state)=>{
      state.comments.items = [];
      state.comments.status = "loading"
    },
    [fetchCommentsByPost.fulfilled]:(state,action)=>{
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchCommentsByPost.rejected]:(state)=>{
      state.comments.items = [];
      state.comments.status = "error"
    },
    //users
    [fetchUsers.pending]:(state)=>{
      state.users.items = [];
      state.users.status = "loading"
    },
    [fetchUsers.fulfilled]:(state,action)=>{
      state.users.items = action.payload;
      state.users.status = "loaded";
    },
    [fetchUsers.rejected]:(state)=>{
      state.users.items = [];
      state.users.status = "error"
    },
    //delete posts
    [fetchRemovePost.pending]:(state,action)=>{
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
    },
    //sort posts by tag
    [fetchPostsWithTag.pending]:(state)=>{
      state.posts.items = [];
      state.posts.status = "loading"
    },
    [fetchPostsWithTag.fulfilled]:(state,action)=>{
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsWithTag.rejected]:(state)=>{
      state.posts.items = [];
      state.posts.status = "error"
    },
  }
})

export const postsReducer = postSlice.reducer;