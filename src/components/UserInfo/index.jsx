import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, username, additionalText }) => {
  const today = new Date(additionalText)
  const month = today.toLocaleString('en', { month: 'short' })
  const dataTime = additionalText.match(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+):\d+.\d+Z/)
  const date = dataTime[3]+" "+month.toLowerCase()+" " + dataTime[1]+ " y." ;
  const time = (parseInt(dataTime[4])+2)+":"+dataTime[5];
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={username} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{username}</span>
        <span className={styles.additional}>{time} &nbsp; {date}</span>
      </div>
    </div>
  );
};
