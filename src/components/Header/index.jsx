import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"
import styles from "./Header.module.scss";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthMe,
  fetchLogout,
  logout,
  selectAvatar,
  selectIsActivated,
  selectIsAuth
} from "../../redux/slices/auth";

export const Header =  () => {

  React.useEffect(async () => {
    await dispatch(fetchAuthMe())
  }, [])
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isAvatar = useSelector(selectAvatar);
  const isActivated = useSelector(selectIsActivated);

  const onClickLogout = async () => {
    if (window.confirm("Do you really want to leave?")) {
      const data = await dispatch(fetchAuthMe());
      await dispatch(fetchLogout(data.payload._id));
      window.localStorage.removeItem("token");
      dispatch(logout())
    }
  };
  return (
    <div  className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>FICT Blog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth  ? (
              <>
                <Link to="/profile">
                  <Button disabled><img className={styles.avatar} src={isAvatar ? `http://localhost:7000${isAvatar}`:"/noavatar.png"}/></Button>
                </Link>
                <Link to="/add-post" style={{ textDecoration: 'none' }}>
                  <Button variant={"outlined"}>Create Post</Button>
                </Link>
                <Button onClick={onClickLogout} variant={"outlined"}>
                  Logout
                </Button>
                {isActivated ? (<Button className={styles.emailBtn} disabled={true}>
                  <svg  width="40px" height="40px" viewBox="0 0 72 72" id="emoji" xmlns="http://www.w3.org/2000/svg">
                    <g id="color">
                      <path fill="#9961ee" d="m61.5 23.3-8.013-8.013-25.71 25.71-9.26-9.26-8.013 8.013 17.42 17.44z" />
                    </g>
                    <g id="line">
                      <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" stroke-width="2"
                            d="m10.5 39.76 17.42 17.44 33.58-33.89-8.013-8.013-25.71 25.71-9.26-9.26z" />
                    </g>
                  </svg>
                </Button>) : (<Button className={styles.emailBtn} disabled={true}><div className={styles.emailBtn}>Confirm Email</div></Button>)}
              </>
            ) : (
              <>
                <Link style={{ textDecoration: 'none' }} to="/login">
                  <Button variant={"outlined"}>Login</Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/registration">
                  <Button variant={"outlined"}>Create Account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
