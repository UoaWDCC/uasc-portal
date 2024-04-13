import { useAppData } from "store/store"
import Navbar from "./Navbar"
import { auth } from "firebase"
import { useNavigate } from "react-router-dom"

export const AppNavbar = () => {
  const [{ currentUser }] = useAppData()
  const navigate = useNavigate()
  const signOut = () => {
    auth.signOut()
    navigate("/login")
  }
  const signIn = () => {
    navigate("/login")
  }
  return (
    <Navbar
      signInHandler={signIn}
      signOutHandler={signOut}
      isLoggedIn={currentUser !== null}
    />
  )
}
