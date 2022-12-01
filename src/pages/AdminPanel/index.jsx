import React from "react";
import styles from "../Profile/Profile.module.scss";
import { Typography } from "@mui/material";
import UsersList from "../../components/UsersList";
import { useSelector } from "react-redux";
import { selectIsAdmin} from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const AdminPanel = () => {
  const isAdmin = useSelector(selectIsAdmin);
  if(isAdmin !== "ADMIN"){
    return <Navigate to="/" />
  }
  return (
    <div className={styles.adminPanel} style={{marginBottom:"6vh"}}>
      <Typography style={{padding:"15px",fontWeight:"bold",}}  classes={{ root: styles.title }} variant="h5">
        Admin Panel
      </Typography>
      <UsersList/>
    </div>
  );
};
