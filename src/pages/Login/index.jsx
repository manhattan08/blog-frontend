import React, { useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form"
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const [isLog,setIsLogin] = useState(0);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit,  formState:{errors,isValid}} = useForm({
    defaultValues:{
      email:"",
      password:""
    },
    mode: "onChange"
  })
  const onSubmit = async (values)=> {
    const data = await dispatch(fetchAuth(values))
    if(!data.payload){
      if(data.error.message.indexOf('409')!==-1){
        return setIsLogin(2)
    }
      return setIsLogin(1);
    }

    if("accessToken" in data.payload){
      window.localStorage.setItem('token',data.payload.accessToken);
    }
  }
  if(isAuth){
    return <Navigate to="/"/>
  }
  return (
    <div style={{paddingBottom:"325px"}}>
      <Paper classes={{ root: styles.root }}>
        <Typography style={{marginBottom:"30px",fontWeight:"bold",}}  classes={{ root: styles.title }} variant="h5">
          Account login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField style={{marginBottom:"40px"}} type="email" label="E-Mail" error={Boolean(errors.email?.message)} helperText={errors.email?.message}   fullWidth {...register("email", {required:"Enter your email"})} />
          <TextField style={{marginBottom:"40px"}} label="Password" type="password" error={Boolean(errors.password?.message)} helperText={errors.password?.message} fullWidth  {...register("password", {required:"Enter your password"})} />
          <Button disabled={!isValid} type="submit" style={{transition:".2s"}} className={styles.button} size="large" variant="contained" fullWidth>
            Login
          </Button>
          <div className={styles.error}>{isLog===1? "Incorrect password or email":isLog===2?"Sorry, user banned":undefined}</div>
        </form>
      </Paper>
    </div>
  );
};
