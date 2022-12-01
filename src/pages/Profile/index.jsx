import React, { useState } from "react";
import { Avatar, Button, Paper, TextField, Typography, Zoom } from "@mui/material";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.scss";
import { fetchUpdate, selectAvatar, selectIsAdmin, selectStatus } from "../../redux/slices/auth";
import axios from "../../axios";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const Profile = () => {
  const dispatch = useDispatch();
  const [avatarUrl,setAvatarUrl] = useState("");
  const [checkbox,setCheckbox] = useState(false);
  const inputFileRef = useRef(null);

  const isAvatar = useSelector(selectAvatar);
  const status = useSelector(selectStatus);
  const isAdmin = useSelector(selectIsAdmin);
  const { register, handleSubmit,  formState:{isValid}} = useForm({
    defaultValues:{
      email:"",
      oldPassword:"",
      newPassword:"",
      avatarUrl:"",
      username:""
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
    await dispatch(fetchUpdate(values))
  }
  return (
    <div style={{marginBottom:"16vh"}}>
      <Paper classes={{ root: styles.root }}>
        <Typography style={{marginBottom:"30px",fontWeight:"bold",}}  classes={{ root: styles.title }} variant="h5">
          Editing an account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.avatar}>
            <Avatar onClick={()=> inputFileRef.current.click()} src={`http://localhost:7000${avatarUrl? avatarUrl:isAvatar}`} sx={{ width: 100, height: 100 }} />
            <input ref={inputFileRef} type="file" onChange={handleChangeAvatar} hidden/>
          </div>
          <TextField  style={{marginBottom:"40px"}} type="text" label="Username" fullWidth {...register("username",{minLength:3,maxLength:32})} />
          <TextField style={{marginBottom:"40px"}} label="Email" type="email"  fullWidth  {...register("email")} />
          <input checked={checkbox} onChange={()=>setCheckbox(!checkbox)} type="checkbox"/> To change password
          <div style={{display:"flex",marginTop:"10px"}}>
            <Zoom in={checkbox}>
              <TextField disabled={!checkbox} style={{marginBottom:"25px",marginRight:"10px"}} error={(status==="error")} helperText={(status==="error")? "Incorrect old password!":undefined} label="Old password" type="password"  fullWidth  {...register("oldPassword",{minLength:5,maxLength:32})} />
            </Zoom>
            <Zoom in={checkbox} style={{ transitionDelay: checkbox ? '500ms' : '0ms' }}>
              <TextField disabled={!checkbox} label="New password" type="password"  fullWidth  error={(status==="error")} helperText={(status==="error")? "Enter new password!":undefined} {...register("newPassword",{minLength:5,maxLength:32})} />
            </Zoom>
          </div>
          <Button disabled={!isValid} type="submit" style={{transition:".2s"}} className={styles.button} size="large" variant="contained" fullWidth>
            Edit
          </Button>
          {(isAdmin==="ADMIN")?
            <Link to="/admin-panel" style={{ textDecoration: 'none' }}>
              <Button style={{transition:".2s", marginTop:"20px",width:"300px"}} className={styles.button} variant={"outlined"} color="error">
                Admin Panel
              </Button>
            </Link>
            : undefined
          }
        </form>
      </Paper>
    </div>
  );
};
