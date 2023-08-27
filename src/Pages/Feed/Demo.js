import React, { useState, useEffect } from "react";
import { ref, push, set, onValue, off} from "firebase/database";
import { database } from "../../firebase";
import styles from './Demo.module.css'
import { auth } from "../../firebase";

export default function Demo({isCreateVisible}) {
  const [note, setNote] = useState("");
  const [userData, setUserData] = useState([]);
  
  const handlechange = () => {
    const db = database;
    const usersRef = ref(db, "users/");
    const newUserRef = push(usersRef);

    set(newUserRef, {
    
      note: note,
      uid:auth.currentUser.uid,
      name:auth.currentUser.displayName,
      photo:auth.currentUser.photoURL,
    });

 
    setNote("")
  };
  

  useEffect(() => {
    const db = database;
    const usersRef = ref(db, "users/");

    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        // Convert the object of users into an array
        const usersArray = Object.entries(usersData).map(([id, user]) => ({
          id,
          ...user,
        }));
        setUserData(usersArray);
        console.log("-------")
        console.log(userData[0].uid)
        console.log(auth.currentUser.uid)
        console.log(userData[0].photo)
      }
    });

    // Clean up the event listener when the component is unmounted
    return () => {
      off(usersRef);
    };
  }, []);

  return (
    <div className={styles.cont}>
      {isCreateVisible && (
        <div>
            {/* <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <input
              type="text"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
            <br />
            <button onClick={handlechange}>Save details</button>
            <hr></hr> */}
            <div className={styles.postinput}>
                <img src={auth.currentUser.photoURL}></img>
                <input
                          
                    type="text"
                    value={note}
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                    placeholder="Start a post"
                />
                <img src="https://img.icons8.com/dusk/64/add-image.png" alt="add-image"/>
                <button  onClick={handlechange}>Post</button>
            </div>
            
        </div>
      )}
      

      {userData.length > 0 ? (
        <div className={styles.postings}>
          <h2>Posts:</h2>
          {userData.map((user) => (
            <div key={user.id} className={styles.mainposts}>
              <img src={user.uid==auth.currentUser.uid?auth.currentUser.photoURL:user.photo} ></img>
              <p>{user.note}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

