import React, { useState, useEffect, useContext } from "react";
import styles from "./Serach.module.css";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
  orderBy
} from "firebase/firestore";
import { db } from "../../../firebase";
import { auth } from "../../../firebase";
import { ChatContext } from "../../../components/context/chatcontext";

export default function Search() {
  const [username, setUsername] = useState(""); 
  const [users, setUsers] = useState([]);
  const {dispatch}=useContext(ChatContext)

  useEffect(() => {
    const unsubscribe = listenForUsers();
    return () => unsubscribe();
  }, []);

  const handlechange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setUsername(inputValue);

    const filteredUsers = users?.filter((item) =>
      item.name.toLowerCase().includes(inputValue)
    );

    setUsers(filteredUsers);
  };

  const listenForUsers = () => {
    console.log(auth.currentUser)
    const q = query(collection(db, "users"), where("name", ">=", username), orderBy("name"),where("name", "!=", auth.currentUser.displayName));
    return onSnapshot(q, (querySnapshot) => {
      const updatedUsers = querySnapshot.docs.map((doc) => doc.data());
      setUsers(updatedUsers);
    });

   
  };


  const handleselect = async (user) => {
    const myuser = auth.currentUser;
    const combinedId =
      myuser.uid > user.uid ? myuser.uid + user.uid : user.uid + myuser.uid;

    const res = await getDoc(doc(db, "chats", combinedId));
    if (!res.exists()) {
      setDoc(doc(db, "chats", combinedId), { messages: [] });

      await setDoc(doc(db, "userchats", user.uid), {
        [combinedId]: {
          userInfo: {
            uid: user.uid,
            displayName: user.name,
            photoURL: user.photoURL,
          },
          date: serverTimestamp(),
        },
      });
      await setDoc(doc(db, "userchats", myuser.uid), {
        [combinedId]: {
          userInfo: {
            uid: myuser.uid,
            displayName: myuser.displayName,
            photoURL: myuser.photoURL,
          },
          date: serverTimestamp(),
        },
      });
    }
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const updatedUsers = querySnapshot.docs.map((doc) => doc.data());
    const filteredUsers = updatedUsers.filter((item) => item.uid !== myuser.uid);
  
   
    setUsers(filteredUsers);
    setUsername("");

    dispatch({type:"CHANGE_USER",payload:user})
    
  };

  const userUrl = "https://img.icons8.com/ios-filled/50/user-male-circle.png";

  return (
    <div className={styles.serach}>
      <div className={styles.searchform}>
        <input
          type="text"
          placeholder="Find a user...."
          onChange={handlechange}
          value={username}
        ></input>
      </div>
      {users.map((user) => (
        <div
          className={styles.userchat}
          key={user.uid}
          onClick={() => handleselect(user)}
        >
          <img
            src={user.photoURL ? user.photoURL : userUrl}
            alt="myimage"
          ></img>
          <div className={styles.userchatinfo}>
            <span>{user.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
