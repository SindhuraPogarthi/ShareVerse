import React, { useState } from 'react'
import styles from './Serach.module.css'
import image from '../../../Assets/images/wllpaper2.webp'
import { collection, query, where,getDocs } from "firebase/firestore";
import {db} from '../../../firebase'

export default function Search() {
  const[username,setUsername]=useState("")
  const[user,setUser]=useState(null)
  const handlekey=(e)=>{
      e.code ==="Enter" && handleSerach()
  }
  const handleSerach=async()=>{
      
      const q=query(collection(db,"users"),where("name","==",username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
       
    });
  }
  const userUrl="https://img.icons8.com/ios-filled/50/user-male-circle.png" ;


  return (
    <div className={styles.serach}>
        <div className={styles.searchform}>
            <input type='text' placeholder='Find a user....' onKeyDown={handlekey} onChange={(e)=>{setUsername(e.target.value);console.log(username);handleSerach()}}></input>
        </div>
        {user && <div className={styles.userchat}>
            <img src={user.photoURL ? user.photoURL : userUrl} alt='myimage'></img>
            <div className={styles.userchatinfo}>
                <span>{user.name}</span>
            </div>

        </div>}

    </div>
  )
}
