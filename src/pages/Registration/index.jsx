import React from "react";
import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistration, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import axios from "../../axios";

export const Registration = () => {
  const [isVerif,setIsVerif] = useState(0);
  const [avatarUrl,setAvatarUrl] = useState("")

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);

  const { register, handleSubmit, formState:{errors,isValid}} = useForm({
    defaultValues:{
      username:"",
      email:"",
      password:"",
      avatarUrl:""
    },
    mode: "onChange"
  })

  const handleChangeAvatar = async (e) =>{
    try{
      const formData = new FormData();
      const file = e.target.files[0]
      formData.append("image",file);
      const { data } = await axios.post("/upload",formData);
      setAvatarUrl(data.url);
    } catch (err) {
      console.warn(err)
      alert("File upload error");
    }
  }
  const onSubmit = async (values)=> {
    values.avatarUrl = avatarUrl;
    const data = await dispatch(fetchRegistration(values))

    if(!data.payload){
      if(data.error.message.indexOf('410')!==-1){
        return setIsVerif(2)
      }
      return setIsVerif(1);
    }

    if("accessToken" in data.payload){
      window.localStorage.setItem('token',data.payload.accessToken);
    }
  }

  if(isAuth){
    return <Navigate to="/"/>
  }

  return (
    <div style={{paddingBottom:"159px"}}>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Create an account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.avatar}>
            <Avatar onClick={()=> inputFileRef.current.click()} src={`http://localhost:7000${avatarUrl}`} sx={{ width: 100, height: 100 }} />
            <input ref={inputFileRef} type="file" onChange={handleChangeAvatar} hidden/>
          </div>
          <TextField className={styles.field} label="Username" fullWidth error={isVerif === 1 ? true: false} helperText={isVerif === 1 ? "Enter another username": undefined} {...register("username", {required:"Enter your username"},{minLength:3,maxLength:32})} />
          <TextField className={styles.field} label="E-Mail" type="email" error={isVerif === 2 ? true: false} helperText={isVerif === 2 ? "Enter another email": undefined} {...register("email", {required:"Enter your email"})} fullWidth />
          <TextField className={styles.field} label="Password" type="password" {...register("password", {required:"Enter your password"},{minLength:5,maxLength:32})} fullWidth />
          <Button disabled={!isValid} type="submit" style={{transition:'.2s'}} className={styles.btn} size="large" variant="contained" fullWidth>
            Login
          </Button>
          <div className={styles.error}>{isVerif === 2 ?"Sorry, this mail is already taken": isVerif === 1 ?"Sorry, this username is already taken":undefined}</div>
        </form>
      </Paper>
    </div>
  );
};
