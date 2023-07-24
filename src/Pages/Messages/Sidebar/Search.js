import React, { useState, useEffect } from 'react';
import styles from './Serach.module.css';
import image from '../../../Assets/images/wllpaper2.webp';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';

export default function Search() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  let allusers

  useEffect(() => {
    const unsubscribe = listenForUsers(); // Start listening for changes when component mounts
    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  const handlechange=(e)=>{
    setUsers(item=>{
      // item.name.toLowerCase().includes(e.target.value.toLowerCase())
      console.log(item)
    })
    
  }

  const listenForUsers = () => {
    console.log("Hello")
    const q = query(collection(db, 'users'), where('name', '>=', username)); // Use '>=' to match all names that contain the value
    return onSnapshot(q, (querySnapshot) => {
      const updatedUsers = querySnapshot.docs
        .map((doc) => doc.data())
        .filter((user) => user.name.toLowerCase().includes(username.toLowerCase())); // Filter users whose names contain the input field value as a substring
          allusers=updatedUsers
          setUsers(allusers)
    });
  };

  const userUrl = 'https://img.icons8.com/ios-filled/50/user-male-circle.png';

  return (
    <div className={styles.serach}>
      <div className={styles.searchform}>
        <input
          type='text'
          placeholder='Find a user....'
          onChange={handlechange}
        ></input>
     
      </div>
      {users?.map((user) => (
       
        <div className={styles.userchat} key={user.uid}>
          <img src={user.photoURL ? user.photoURL : userUrl} alt='myimage'></img>
          <div className={styles.userchatinfo}>
            <span>{user.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
