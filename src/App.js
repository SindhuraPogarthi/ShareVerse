// import React, { useEffect, useState } from 'react'
// // import Login from './components/Login/Login'
// import Signup from './components/SignUp/Signup'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './components/Login/Login'
// import Mainpage from './components/Mainpage'
// import { auth } from './firebase'
// import { onAuthStateChanged } from 'firebase/auth'


// export default function App() {
//   const[user,setUser]=useState("")
//   useEffect(()=>{
//     onAuthStateChanged(auth,(user)=>{
//       if(user){
//         setUser(user.displayName)
//    // setUser(user.email.substr(0,user.email.indexOf("@")))   //displays upto @ in the email as displayname
//       }
//       else{
//         setUser("")
//       }
//     })

//   })
//   return (
// <>
// <BrowserRouter>
//           <Routes>
//             <Route path='/' element={<Signup/>}/>
//             <Route path='/login' element={<Login/>}/>
//             <Route path='/mainpage' element={<Mainpage user={user}/>}/>
//           </Routes>
// </BrowserRouter>
//    </>
//   )
// }
import React from 'react'
import Demo from './components/Feed/Demo'


export default function App() {
  return (
    <div>
        <Demo/>
      
    </div>
  )
}

