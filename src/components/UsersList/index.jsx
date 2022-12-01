import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UsersList.module.scss"
import {  fetchUsers } from "../../redux/slices/posts";
import BlockIcon from '@mui/icons-material/Block';
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import axios from "../../axios";


const UsersList = () => {
  const dispatch = useDispatch();
  const {users} = useSelector(state => state.posts);
  const isUsersLoading = users.status === "loading";
  React.useEffect( ()=>{
    dispatch(fetchUsers())
  },[])
  const [reasonBan,setReason] = React.useState("")
  async function setBan(id, isBan) {
    try {
      const ban = { reasonBan, isBan }
      await axios.patch(`/userBan/${id}`, ban);
      dispatch(fetchUsers())
    } catch (e) {
      console.warn(e);
    }
  }
  async function getModer(id,roles) {
    try {
      const buff = {role: roles}
      await axios.patch(`/setModer/${id}`, buff);
      dispatch(fetchUsers())
    } catch (e) {
      console.warn(e);
    }
  }

  return (
      <table className={styles.table}>
        <thead>
        <tr>
          <th>Avatar</th>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Ban</th>
          <th>Reason</th>
          <th>Give moder</th>
        </tr>
        </thead>
        <tbody>
        {(isUsersLoading ? [...Array(5)]: users.items).map((obj)=>
          isUsersLoading? undefined:
          <tr>
            <td><img className={styles.avatar} src={obj.avatarUrl ? `http://localhost:7000${obj.avatarUrl}` : '/noavatar.png'} alt={obj.username} /></td>
            <td style={{width:"100px"}}>{obj._id}</td>
            <td>{obj.username}</td>
            <td style={{width:"100px"}}>{obj.email}</td>
            <td style={{width:"50px"}}>{obj.role}</td>
            <td>
              {obj.ban.isBan  ?
                <IconButton onClick={()=>{setBan(obj._id,false)}} color="secondary">
                  <KeyboardDoubleArrowUpIcon style={{color:"black"}}/>
                </IconButton>
                :
                <IconButton onClick={()=>{setBan(obj._id,true)}} color="secondary">
                  <BlockIcon style={{color:"black"}}/>
                </IconButton>
              }
            </td>
            <td>
              <TextField onChange={(e)=>setReason(e.target.value)} disabled={obj.ban.isBan} value={obj.ban.reasonBan ? obj.ban.reasonBan: undefined} size={"small"} autoComplete="off"></TextField>
            </td>
            <td style={{width:"50px"}}>
              {obj.role === "MODER"?
                <IconButton onClick={()=>{getModer(obj._id,"USER")}} color="secondary">
                  <RemoveModeratorIcon style={{color:"black"}}/>
                </IconButton>
              :
                <IconButton onClick={()=>{getModer(obj._id,"MODER")}} color="secondary">
                  <AddModeratorIcon style={{color:"black"}}/>
                </IconButton>
              }
            </td>
          </tr>
          )}
        </tbody>
      </table>
  );
};

export default UsersList;