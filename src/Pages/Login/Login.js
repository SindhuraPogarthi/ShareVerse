import React, { useState } from "react";
import styles from "./Login.module.css";
import user from "../../Assets/images/user.png";
import lock from "../../Assets/images/lock.png";
import google from "../../Assets/images/google.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, provider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { toast, Toaster } from "react-hot-toast";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";



export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handlelogin = () => {
    if (!values.email || !values.password) {
      toast.error("All fields are mandatory");
      return;
    }

    toast.promise(
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((res) => {
          const user = res.user;
          console.log(user);
          setTimeout(() => {
            navigate('/mainpage')
          }, 1000);
        })
        .catch((err) => {
            if (err.message === "Firebase: Error (auth/invalid-email).") {
                throw new Error("Enter a valid email");
            }
            else if (err.message === "Firebase: Error (auth/wrong-password).") {
                throw new Error("Enter a valid password");
            }

          throw new Error(err);
        }),


        

      {
        loading: "Saving...",
        success: <b>Successfully Logged in!</b>,
        error: (err) => <b>{err.message}</b>,
      }
    );
  };
  const handlegoogle = () => {
    console.log("hi");
    toast.promise(
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          if(user){
            navigate("/mainpage");
          }
          console.log(user);
          console.log(token);
          return setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }).then(() => {
            // Create an empty document for user chats in the "userchats" collection
            return setDoc(doc(db, "userchats", user.uid), {});
          });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
        }),
      {
        loading: "Saving...",
        success: <b>Successfully Signed up!</b>,
        error: (err) => <b>{err}</b>,
       }
    );
    
  };
  return (
    <div className={styles.container}>
      <div className={styles.signinouter}>
        <h1>Log in</h1>
        <div className={styles.signinusername}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, email: e.target.value }))
            }
          ></input>
          <img src={user} alt="username"></img>
        </div>
        <div className={styles.signinpassword}>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, password: e.target.value }))
            }
          ></input>
          <img src={lock} alt="username"></img>
        </div>
        <div className={styles.additionalline}>
          <input type="checkbox" className={styles.checkbox}></input>
          <span>Remember me</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.4 }}
          onClick={handlelogin}
        >
          Login
        </motion.button>
        <div className={styles.google} onClick={handlegoogle}>
          <img src={google} alt="google"></img>
          <span>Login in with google</span>
        </div>
        <div className={styles.signinbtmsignup}>
          <span>Already have an account?</span>
          <span onClick={() => navigate("/")} className={styles.signupbtm}>
            Sign Up
          </span>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
