import React from 'react'
import styles from './Friends.module.css'
import { auth } from '../firebase';


export default function Friends() {
    
  
    const user = auth.currentUser;
    console.log(user)
    if (!user) {
        return null;
    }

    const {displayName,photoURL} = user;
    const userUrl="https://img.icons8.com/ios-filled/50/user-male-circle.png" ;

  return (
    <div className={styles.cont}>
        <div style={{margin:"20px 10px",display:'flex',alignItems:"center"}}>

            <img src={photoURL ? photoURL : userUrl} alt='user' className={styles.images}></img>
            <span style={{marginLeft:"10px"}}>{displayName}</span>
        </div>
        
    </div>
  )
}
