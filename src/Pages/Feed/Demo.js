import React, { useState, useEffect } from "react";
import { ref, push, set, onValue, off} from "firebase/database";
import { database } from "../../firebase";
import styles from './Demo.module.css'

export default function Demo() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [userData, setUserData] = useState([]);
  
  const handlechange = () => {
    const db = database;
    const usersRef = ref(db, "users/");
    const newUserRef = push(usersRef);

    set(newUserRef, {
      Name: name,
      Age: age,
    });

    setName("")
    setAge("")
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
      }
    });

    // Clean up the event listener when the component is unmounted
    return () => {
      off(usersRef);
    };
  }, []);

  return (
    <div className={styles.cont}>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <br />
      <button onClick={handlechange}>Save details</button>

      {userData.length > 0 ? (
        <div>
          <h2>User Data:</h2>
          {userData.map((user) => (
            <div key={user.id}>
              <p>Name: {user.Name}</p>
              <p>Age: {user.Age}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

