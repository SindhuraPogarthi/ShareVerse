import React, { useContext, useEffect, useState } from 'react'
import styles from './Chat.module.css'
import { auth, db } from '../../../firebase'
import Messages from './Messages'
import { ChatContext } from '../../../components/context/chatcontext'
import { Timestamp, arrayUnion, doc,onSnapshot, updateDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'


export default function Chat() {
  const {data}=useContext(ChatContext)
  const myuser=auth.currentUser;
  const [text,settext]=useState("")
  const [messages,setmessages]=useState([])
  console.log(data.chatId)
 
  useEffect(()=>{
    const unSub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setmessages(doc.data().messages)
      
    })
    
    return ()=>{
      unSub()
    }
  },[data.chatId])
 


  const userUrl="https://img.icons8.com/ios-filled/50/user-male-circle.png" ;
  const handleSend=async()=>{
    console.log("Text value:", text)
      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:myuser.id,
          date:Timestamp.now()

        })
      }
  )}
  


  return (
    <div className={styles.cont}>
        <div className={styles.chatinfo}>
          <div className={styles.contactname}>

            <img src={data.user.photoURL?data.user.photoURL : userUrl} alt='myimg'></img>
            <span>{data.user.name}</span>
          </div>
          <div className={styles.chaticons}>
          <img  src="https://img.icons8.com/windows/64/phone.png" alt="phone"/>        
          <img  src="https://img.icons8.com/carbon-copy/100/video-call.png" alt="video-call"/>          
          <img  src="https://img.icons8.com/ios-glyphs/60/more.png" alt="more"/>
          </div>

        </div>
        <div className={styles.mymessages}>
          {messages.map(m=>{
            <Messages message={m} key={m.id}/>

          })}
         
        </div>
        <div className={styles.searchbar}>
          <div className={styles.messageouter}>
            <input type='search' placeholder='Type something......' onChange={e=>{settext(e.target.value)}}></input>
            <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/60/happy--v1.png" alt="happy--v1"/>
            <img width="25" height="25" src="https://img.icons8.com/ios/100/add-file.png" alt="add-file"/>            
            <img width="30" height="30" src="https://img.icons8.com/material-outlined/24/sent.png" alt="sent" onClick={handleSend}/>
          </div>
        </div>
    </div>
  )
}