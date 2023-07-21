import React, { useState } from 'react';
import {ref,push, set } from "firebase/database";
import {database} from '../../firebase'

export default function Demo() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handlechange = () => {
      
        const db = database;
        const usersRef = ref(db, 'users/');
        const newUserRef = push(usersRef); // Generate a unique key for the new user

        set(newUserRef, {
             Name: name,
             Age: age,
            });
            
   

    }

    return (
        <div>
            <input type='text' value={name} onChange={(e) => { setName(e.target.value) }}></input>
            <br />
            <input type='text' value={age} onChange={(e) => { setAge(e.target.value) }}></input>
            <br />
            <button onClick={handlechange}>Save details</button>
        </div>
    )
}
