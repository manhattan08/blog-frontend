import React from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { SideBlock } from "../SideBlock";
import Grid from "@mui/material/Grid";
import { Avatar, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { selectAvatar, selectIsAuth, selectUsername } from "../../redux/slices/auth";
import styles from "./Dialog.module.scss"

export const DialogWindow = () => {
  const avatarUrl = useSelector(selectAvatar);
  const username = useSelector(selectUsername);
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(()=>{
    setTimeout(()=>{
      updateHeight()
    },500)
  },[])

  firebase.initializeApp({
    apiKey: "AIzaSyD9Y5Mq5K_LzXXnIpmRZGLfkJMnnAVPZKM",
    authDomain: "blog-245ac.firebaseapp.com",
    projectId: "blog-245ac",
    storageBucket: "blog-245ac.appspot.com",
    messagingSenderId: "251053173963",
    appId: "1:251053173963:web:285b25424694751b503f4e",
    measurementId: "G-9Q5EE39JJG"
  })

  const firestore = firebase.firestore()

  const [value,setValue] = React.useState("");
  const messages = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  )[0];

  const sendMessage = async() => {
      firestore.collection("messages").add({
        displayName:username,
        photoUrl:avatarUrl,
        text:value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      setTimeout(()=>{
        updateHeight()
      },500)
    setValue(" ")
  }

  const updateHeight = () => {
    const el = document.getElementById("chat");
    if(el){
      el.scrollTop = el.scrollHeight;
    }

  }
  return (
    <SideBlock title="Chat">
      <Grid container
            justifyContent={"center"}
      >
        <div id="chat" className={styles.window}>
          {messages?.map(message=>
            <div style={{margin:"10px",
              backgroundColor:username === message.displayName ? "#F5F5F5" : "transparent",
              borderRadius:"5px",
              marginLeft: username === message.displayName ? "auto" : "10px",
              width:"fit-content",
              padding:"5px"
            }}>
              <Grid style={{marginBottom:"3px"}} container>
                <Avatar style={{width:"30px",height:"30px",marginRight:"7px"}} src={`http://localhost:7000${message.photoUrl}`}/>
                <div style={{fontSize:"14px"}}>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          )}
        </div>
        <Grid container direction={"row"} alignItems={"flex-end"} justifyContent={"space-between"} style={{width:"92%",marginTop:"10px",marginBottom:"10px"}}>
          <TextField
            disabled={!isAuth}
            value={value}
            inputProps={{maxLength:25,minLength:3}}
            variant={"outlined"}
            onChange={e => setValue(e.target.value)}
            className={styles.input}
          />
          <Button disabled={(value.length < 4 ? true:false)} onClick={sendMessage} variant={"outlined"}  style={{height:'56px',width:"100px"}}>Send</Button>
        </Grid>
      </Grid>
    </SideBlock>
  );
};
