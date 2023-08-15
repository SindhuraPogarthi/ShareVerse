import React, { useEffect, useState } from "react";
import Signup from "./Pages/SignUp/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Mainpage from "./components/Mainpage";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Msg from "./Pages/Messages/Msg";
import Settings from "./Pages/Settings/Settings";

export default function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName);
        // setUser(user.email.substr(0,user.email.indexOf("@")))   //displays upto @ in the email as displayname
      } else {
        setUser("");
      }
    });
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainpage" element={<Mainpage user={user} />} />
          <Route path="/messages" element={<Msg />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        {/* <Routes>
            <Route path='/' element={<Mainpage/>}  />
          </Routes> */}
      </BrowserRouter>
    </>
  );
}
// import React from 'react'
// import Demo from './Pages/Feed/Demo'

// export default function App() {
//   return (
//     <div>
//         <Demo/>

//     </div>
//   )
// }
