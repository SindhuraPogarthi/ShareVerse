import React, { useEffect, useState } from 'react'
import Signup from './Pages/SignUp/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Mainpage from './components/Mainpage'
import Msg from './Pages/Messages/Msg'
import Settings from './Pages/Settings/Settings'
import Create from './Pages/Create/Create'


export default function App() {

  
  return (
<>
<BrowserRouter>
          <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/mainpage' element={<Mainpage/>}/>
            <Route path='/messages' element={<Msg/>}/>
            <Route path='/settings' element={<Settings />}/>
            <Route path='/create' element={<Create/>}/>
          </Routes>
          {/* <Routes>
            <Route path='/' element={<Mainpage/>}  />
          </Routes> */}
</BrowserRouter>
   </>
  )
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

