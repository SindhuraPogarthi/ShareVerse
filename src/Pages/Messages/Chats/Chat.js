import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import { auth, db, storage } from "../../../firebase";
import Messages from "./Messages";
import { ChatContext } from "../../../components/context/chatcontext";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { Toaster, toast } from "react-hot-toast";


export default function Chat() {
  const userUrl = "https://img.icons8.com/ios-filled/50/user-male-circle.png";
  const { data } = useContext(ChatContext);

  const [text, settext] = useState("");
  const [img, setImg] = useState(null);
  const [messages, setmessages] = useState([]);
  const messagesRef = useRef(null);


  console.log(data.chatId);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setmessages(doc.data().messages);
      scrollToBottom();

    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const handleSend = async () => {
    const myuser = auth.currentUser;

    console.log(myuser);
    console.log("Text value:", text);

    settext("");
    setImg(null);

    if(!img && !text){
      return ""
    }

    if (img) {
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
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: Timestamp.now(),
                    text,
                    senderId: myuser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
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
    } else  {
      // Send text message without loading toast
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: Timestamp.now(),
          text,
          senderId: myuser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    console.log("Message sent!");
  };

  const handlepress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    
    }
  };

  return (
    <div className={styles.cont}>
      <div className={styles.chatinfo}>
        <div className={styles.contactname}>
          <img
            src={data.user.photoURL ? data.user.photoURL : userUrl}
            alt="myimg"
          ></img>
          <span>{data.user.name}</span>
        </div>
        <div className={styles.chaticons}>
          <img src="https://img.icons8.com/windows/64/phone.png" alt="phone" />
          <img
            src="https://img.icons8.com/carbon-copy/100/video-call.png"
            alt="video-call"
          />
          <img src="https://img.icons8.com/ios-glyphs/60/more.png" alt="more" />
        </div>
      </div>
      <div className={styles.mymessages}>
        {messages.map((m) => (
          <Messages message={m} key={m.id}  ref={messagesRef}/>
        ))}
      </div>
      <div className={styles.searchbar}>
        <div className={styles.messageouter}>
          <input
            type="search"
            placeholder="Type something......"
            onChange={(e) => {
              settext(e.target.value);
            }}
            onKeyDown={handlepress}
            value={text}
          ></input>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-glyphs/60/happy--v1.png"
            alt="happy--v1"
          />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => {
              console.log("Selected file:", e.target.files[0]);
              setImg(e.target.files[0])}
            }
          />
          <label htmlFor="file">
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/ios/100/add-file.png"
              alt="add-file"
            />
          </label>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/material-outlined/24/sent.png"
            alt="sent"
            onClick={handleSend}
          />
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
