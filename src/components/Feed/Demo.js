import React, { useState, useEffect } from "react";
import { ref, push, set, onValue, off } from "firebase/database";
import { database } from "../../firebase";

export default function Demo() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [userData, setUserData] = useState(null);

  const handlechange = () => {
    const db = database;
    const usersRef = ref(db, "users/");
    const newUserRef = push(usersRef);

    set(newUserRef, {
      Name: name,
      Age: age,
    });
  };

  useEffect(() => {
    
    const db = database;
    const id = "-N_tN34MlA2D8O-KzK4x"

    const useref = ref(db, `users/${id}`);
    onValue(useref, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
      
      console.log(data);
    });
  }, []);

  return (
    <div>
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

      {userData && (
        <div>
          <h2>User Data:</h2>
          <p>Name: {userData.Name}</p>
          <p>Age: {userData.Age}</p>
        </div>
      )}
    </div>
  );
}
