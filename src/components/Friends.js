import React, { useEffect,useState } from "react";
import styles from "./Friends.module.css";
import { auth, db } from "../firebase";
import { collection,where,orderBy,query,onSnapshot } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Friends() {
  const user = auth.currentUser;
  console.log(user);
  const { displayName, photoURL } = user;
  const [usersData, setUsersData] = useState([]); // State to store fetched users data

  const userUrl = "https://img.icons8.com/ios-filled/50/user-male-circle.png";

  
//   const handlelogout=()=>{
//     signOut(auth).then(()=>{
//         Navigate('/login')
//     })

// }
  useEffect(() => {
    const unsubscribe = listenForUsers();
   
  }, []);

  const listenForUsers = async () => {
   
    const q = query(collection(db, "users"),orderBy("uid"),where("uid","!=",auth.currentUser.uid));
    return onSnapshot(q, (querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => doc.data());
      setUsersData(users)
    });

    // if (!user) {
    //   return null;
    // }
  
  }

  return (
    <div className={styles.cont}>
      <div
        style={{ margin: "20px 10px", display: "flex", alignItems: "center"}}
      >
        <img
          src={photoURL ? photoURL : userUrl}
          alt="user"
          className={styles.images}
        ></img>
        <span style={{ marginLeft: "10px" }}>{displayName}</span>
        {/* <button className={styles.logout} onClick={handlelogout}>
                Log out
            </button> */}
      </div>
      <div className={styles.addpeople}>
      <header> Suggested for you</header>
        <div className={styles.people}>
        <ul>
        
          {usersData.map((user) => (
            <>
           
            <li key={user.id}>
              <div>

              <img
                src={user.photoURL ? user.photoURL : userUrl}
                alt="user"
                className={styles.images}
              ></img>
             
              <span style={{ marginLeft: "10px" }}>{user.name}</span>
              </div>
              <button>Follow</button>
            </li>
            
        
            </>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}
