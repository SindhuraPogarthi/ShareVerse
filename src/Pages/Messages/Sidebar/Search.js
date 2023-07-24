import React, { useState, useEffect } from 'react';
import styles from './Serach.module.css';
import image from '../../../Assets/images/wllpaper2.webp';
import { collection, query, where, onSnapshot, getDocs, setDoc,doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { auth } from '../../../firebase';


export default function Search() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    const unsubscribe = listenForUsers(); 
    return () => unsubscribe(); 
  }, []);

  const handlechange=(e)=>{
    const inputValue = e.target.value.toLowerCase();
      console.log(allUsers)

      const filteredUsers = allUsers?.filter((item) => item.name.toLowerCase().includes(inputValue));
      console.log(filteredUsers);
      setUsers(filteredUsers);
  }

  const listenForUsers = () => {
   
    const q = query(collection(db, 'users'), where('name', '>=', username)); 
    return onSnapshot(q, (querySnapshot) => {
      const updatedUsers = querySnapshot.docs
        .map((doc) => doc.data())
        .filter((user) => user.name.toLowerCase().includes(username.toLowerCase())); 
          setAllUsers(updatedUsers)
          setUsers(updatedUsers)
    });
  };

  const handleselect=async(user)=>{
    const myuser = auth.currentUser;
    const combinedId= myuser.uid > user.uid? myuser.uid + user.uid: user.uid+myuser.uid
    console.log(user.uid)
    console.log(user.name)
    console.log(user)
    const res= await getDoc(doc(db,'chats',combinedId))
    if(!res.exists()){
      setDoc(doc(db, 'chats', combinedId), { messages: [] });

      await setDoc(doc(db, 'userchats', user.uid), {
        [combinedId]:{
          userInfo:
          {
             uid: user.uid,
             displayName: user.name,
             photoURL: user.photoURL
           },
           date: serverTimestamp()
         
       }
      });
      await setDoc(doc(db, 'userchats', myuser.uid), {
        [combinedId]: {
          userInfo: {
            uid: myuser.uid,
            displayName: myuser.displayName,
            photoURL: myuser.photoURL
          },
          date: serverTimestamp()
        }
      });
      
    }


  }

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
      {users.map((user) => (
       
        <div className={styles.userchat} key={user.uid} onClick={() => handleselect(user)}>
          <img src={user.photoURL ? user.photoURL : userUrl} alt='myimage'></img>
          <div className={styles.userchatinfo}>
            <span>{user.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}