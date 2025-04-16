import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import SignUp from "./pages/SignUp/SignUp"
import SignIn from "./pages/SignIn/SignIn"
import Compose from "./pages/Compose/Compose"
import Published from "./pages/Published/Published"
import MyBlogs from "./pages/MyBlogs/MyBlogs"
import Refine from "./pages/Refine/Refine"
import MyProfile from "./pages/MyProfile/MyProfile"
import Blogs from"./pages/Blogs/Blogs"

function App() {
  return (
    <>
     <Routes>
      <Route path="" element={ <Home />} />
      <Route path="/signup" element={ <SignUp />} />
      <Route path="/signin" element={ <SignIn />} />
      <Route path="/compose" element={ <Compose />} />
      <Route path="/published/:entryId" element={ <Published />} />
      <Route path="/myblogs" element={ <MyBlogs />} />
      <Route path="/refine/:entryId" element={ <Refine />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/blogs" element={<Blogs />} />
     </Routes>
    </>
  )
}

export default App
