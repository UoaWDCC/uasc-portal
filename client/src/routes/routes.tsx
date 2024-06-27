import About from "pages/About"
import Admin from "pages/Admin/Admin"
import Booking from "pages/Booking"
import Contact from "pages/Contact"
import Events from "pages/Events"
import Home from "pages/Home/Home"
import Login from "pages/Login/Login"
import Profile from "pages/Profile/Profile"
import Register from "pages/Register/Register"
import { Route, Routes } from "react-router-dom"
import NoMatch from "pages/404"

export const AllRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="events" element={<Events />} />
      <Route path="contact" element={<Contact />} />
      <Route path="register/*" element={<Register />} />
      <Route path="login/*" element={<Login />} />
      <Route path="bookings/*" element={<Booking />} />
      <Route path="profile" element={<Profile />} />
      <Route path="admin/*" element={<Admin />} />
      <Route path="admin/members/user?id=<user-id>" element={} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
)
