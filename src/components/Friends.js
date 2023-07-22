import React from 'react'
import styles from './Friends.module.css'
import { auth } from '../firebase';


export default function Friends() {
    
  
    const user = auth.currentUser;
    if (!user) {
        return null;
    }

    const {displayName,photoURL} = user;

  return (
    <div className={styles.cont}>
        <div style={{margin:"20px 10px",display:'flex',alignItems:"center",justifyContent:"space-around"}}>

            <img src={photoURL} className={styles.images}></img>
            <span>{displayName}</span>
        </div>
        
    </div>
  )
}
