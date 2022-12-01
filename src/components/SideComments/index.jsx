import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styles from "./SideComments.module.scss";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "../../axios";
import { fetchCommentsByPost } from "../../redux/slices/posts";
import { useDispatch, useSelector } from "react-redux";
import { selectAvatar, selectIsAdmin } from "../../redux/slices/auth";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

export const SideComments = ({id}) => {
  const dispatch = useDispatch();
  const isAvatar = useSelector(selectAvatar);
  const isAdmin = useSelector(selectIsAdmin);
  const [body,setBody] = useState({body:""});
  const {comments} = useSelector(state => state.posts);

  React.useEffect(()=>{
    dispatch(fetchCommentsByPost(id))
  },[])
  const onSubmit = async () => {
    try{
      await axios.post(`/comment/${id}`,body)
      setBody({body: ""})
      dispatch(fetchCommentsByPost(id))
    } catch (e) {
      console.warn(e);
      alert("Your comment too small or big")
    }
  }

  const onClickRemove = async (ids) =>{
    await axios.delete(`/comment/${ids}`)
    await axios.patch(`/delete-comment/${id}`)
    dispatch(fetchCommentsByPost(id))
  }

  return (
    <List>
      {comments.items.map((obj) => (
        <React.Fragment key={obj._id}>
          <ListItem alignItems="flex-start" className={styles.listItem}>
            <ListItemAvatar>
              <Avatar alt={obj.username.username} src={obj.avatarUrl ? `http://localhost:7000${obj.avatarUrl.avatarUrl}` : ''} />
            </ListItemAvatar>
            <ListItemText primary={obj.username.username} secondary={obj.body} />
            {((isAdmin === "ADMIN") || (isAdmin === "MODER"))?
              < IconButton onClick={()=>onClickRemove(obj._id)} color="secondary">
              <DeleteIcon/>
              </IconButton>
              : undefined}
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
      <>
        <div className={styles.root}>
          <Avatar
            classes={{ root: styles.avatar }}
            src={isAvatar ? `http://localhost:7000${isAvatar}` : ''}
          />
          <div className={styles.form}>
            <TextField
              label="Write a comment"
              variant="outlined"
              maxRows={10}
              value={body.body}
              onChange={(e)=>setBody({body:e.target.value})}
              multiline
              fullWidth
            />
            <Button onClick={onSubmit} variant="contained">Submit</Button>
          </div>
        </div>
      </>
    </List>
  );
};
