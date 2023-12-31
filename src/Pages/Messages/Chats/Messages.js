import React, { useContext, useEffect, useRef } from 'react'
import styles from './Messages.module.css'
import { auth } from '../../../firebase'
import { ChatContext } from '../../../components/context/chatcontext'




export default function Messages({message}) {
  const userUrl = "https://img.icons8.com/ios-filled/50/user-male-circle.png";

    const myuser=auth.currentUser
    const {data}=useContext(ChatContext)
    const formatMessageTime = (timestamp) => {
        const date = timestamp.toDate();
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };

    const ref=useRef()
  
    useEffect(()=>{
        ref.current?.scrollIntoView ({behavior:"smooth"})
    },[message])
   
    
    // console.log(message)
  return (
    <div className={styles.cont}>
        <div ref={ref} className={`${styles.message} ${message.senderId === myuser.uid && styles.owner}`}>
            <div className={styles.messageinfo}>
                <img src={message.senderId==myuser.uid?myuser.photoURL:(data.user.photoURL?data.user.photoURL:userUrl)}></img>
                <span>{formatMessageTime(message.date)}</span>
            </div>
            <div className={styles.messagecontent}>
               {message.text &&  <p>{message.text}</p>}
                {message.img && <img width="300"src={message.img} alt=''></img>}
               
            </div>
        </div>
        </div>
  )
}
