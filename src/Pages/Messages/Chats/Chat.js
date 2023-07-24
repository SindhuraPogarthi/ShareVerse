import React from 'react'
import styles from './Chat.module.css'
import image from '../../../Assets/images/wllpaper2.webp'
import Messages from './Messages'


export default function Chat() {
  return (
    <div className={styles.cont}>
        <div className={styles.chatinfo}>
          <div className={styles.contactname}>

            <img src={image} alt='myimg'></img>
            <span>Camella</span>
          </div>
          <div className={styles.chaticons}>
          <img  src="https://img.icons8.com/windows/64/phone.png" alt="phone"/>        
          <img  src="https://img.icons8.com/carbon-copy/100/video-call.png" alt="video-call"/>          
          <img  src="https://img.icons8.com/ios-glyphs/60/more.png" alt="more"/>
          </div>

        </div>
        <div className={styles.mymessages}>
          
          <Messages/>
          <Messages/>
          <Messages/>
          <Messages/>
          <Messages/>
          <Messages/>
          <Messages/>
          <Messages/>
          <Messages/>
          <Messages/>
          <Messages/>
          <Messages/>
        </div>
        <div className={styles.searchbar}>
          <div className={styles.messageouter}>
            <input type='search'></input>
            <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/60/happy--v1.png" alt="happy--v1"/>
            <img width="25" height="25" src="https://img.icons8.com/ios/100/add-file.png" alt="add-file"/>            
            <img width="30" height="30" src="https://img.icons8.com/material-outlined/24/sent.png" alt="sent"/>
          </div>
        </div>
    </div>
  )
}
