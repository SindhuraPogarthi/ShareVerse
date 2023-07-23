import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Chat from './Chats/Chat'
import styles from './Msg.module.css'

export default function Msg() {
  return (
    <div className={styles.cont}>
        <Sidebar/>
        <Chat/>
    </div>
  )
}
