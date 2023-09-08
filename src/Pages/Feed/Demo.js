import React, { useState, useEffect } from "react";
import { ref as databaseRef, push, set, onValue, off, refFromURL } from "firebase/database";
import { uploadBytesResumable, getDownloadURL,  ref} from "firebase/storage";

import { database, storage } from "../../firebase";
import styles from "./Demo.module.css";
import { auth } from "../../firebase";
import { v4 as uuid } from "uuid";
import { Toaster, toast } from "react-hot-toast";


export default function Demo({ isCreateVisible }) {
  // console.log(isCreateVisible)
  const [note, setNote] = useState("");
  const [userData, setUserData] = useState([]);
  const [img, setImg] = useState(null);

  const handlechange = async () => {
    const db = database;
    const usersRef = databaseRef(db, "users/");
    const newUserRef = push(usersRef);
    // if (note) {
    //   set(newUserRef, {
    //     note: note,
    //     uid: auth.currentUser.uid,
    //     name: auth.currentUser.displayName,
    //     photo: auth.currentUser.photoURL,
    //   });

    //   setNote("");
    // }
    if(!img && !note){
      return ""
    }

    if (img || (img && note)) {
      // Show loading toast for image upload
      toast.promise(
        new Promise(async (resolve, reject) => {
          const storageRef = ref(storage, uuid());
          const uploadTask = uploadBytesResumable(storageRef, img);
  
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error);
              reject("Couldn't upload image");
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await set(newUserRef, {
                      note: note,
                      uid: auth.currentUser.uid,
                      name: auth.currentUser.displayName,
                      photo: auth.currentUser.photoURL,
                      postimg: downloadURL,
                    });
                resolve("Sent");
              } catch (error) {
                console.log(error);
                reject("Couldn't save the message. Please try again later.");
              }
            }
          );
        }),
        {
          loading: "Sending...",
          success:"Sent",
          error: (errMsg) => {
            toast.error(errMsg);
          },
        }
        
      );
      setNote("");
      setImg(null)
    } else  {
      // Send text message without loading toast
      await set(newUserRef, {
        note: note,
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      });
    }

    console.log("Message sent!");
    setNote("");
  };

  const handlepress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlechange();
    }
  };

  useEffect(() => {
    const db = database;
    const usersRef = databaseRef(db, "users/");

    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        // Convert the object of users into an array
        const usersArray = Object.entries(usersData).map(([id, user]) => ({
          id,
          ...user,
        }));
        setUserData(usersArray.reverse());
        // console.log("-------")
        // console.log(userData[0].uid)
        // console.log(auth.currentUser.uid)
        // console.log(userData[0].photo)
      }
      
    });

    // Clean up the event listener when the component is unmounted
    return () => {
      off(usersRef);
    };
  });

  return (
    <div className={styles.cont}>
      {isCreateVisible && (
        <div className={styles.mycreate}>
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
              onKeyDown={handlepress}
            />
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => {
                console.log("Selected file:", e.target.files[0]);
                setImg(e.target.files[0]);
              }}
            />
            <label htmlFor="file">
              <img
                style={{height:"40px",width:"40px",paddingTop:"5px"}}
                src="https://img.icons8.com/color/48/image-gallery.png"
                alt="add-file"
              />
            </label>
            <button onClick={handlechange}>Post</button>
          </div>
        </div>
      )}

      {userData.length > 0 ? (
        <div className={styles.postings}>
          <h2>Posts:</h2>
          {userData.map((user) => (
            <div key={user.id} className={styles.mainposts}>
              <div className={styles.userdetails}>
                <img
                  src={
                    user.uid === auth.currentUser.uid
                      ? auth.currentUser.photoURL
                      : user.photo
                  }
                  alt="myimg"
                />
                <span>
                  {user.uid === auth.currentUser.uid
                    ? auth.currentUser.displayName
                    : user.name}
                </span>
              </div>
              <div className={styles.posts}>
                <p>{user.note}</p>
                {user.postimg && <img  src={user.postimg} ></img>}
              </div>
            </div>
          ))}
          <Toaster/>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
