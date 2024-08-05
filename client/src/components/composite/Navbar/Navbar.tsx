import HamburgerIcon from "@/assets/icons/hamburger.svg"
import UASCLogo from "@/assets/logos/UASC-LOGO-White.svg"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import InstagramLink from "./utils/InstagramLink"
import LoginIndicator from "./utils/LoginIndicator"
import WrappedMenuTab from "./utils/WrappedMenuTab"
import { WrappedTab } from "./utils/WrappedTab"

export interface INavbarProps {
  signInHandler: () => void
  signOutHandler: () => void
  isLoggedIn: boolean
  isAdmin?: boolean
}

const Logo = () => {
  return (
    <Link href="/">
      <div className="h-[39px] w-[36px]">
        <UASCLogo className="fill-light-blue-100" />
      </div>
    </Link>
  )
}

const AboutMenuItemsFull = () => {
  return (
    <>
      <Link href="/contact">Contact</Link>
    </>
  )
}

const AboutMenuItemsMobile = () => {
  return (
    <div className="flex w-full flex-col gap-2 md:hidden">
      <WrappedTab to="/about">About</WrappedTab>
      <WrappedTab to="/contact">Contact</WrappedTab>
    </div>
  )
}

const Navbar = ({
  signInHandler,
  signOutHandler,
  isLoggedIn,
  isAdmin
}: INavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const pathname = usePathname()

  useEffect(() => {
    /**
     * "Close navbar on route change"
     */
    setIsOpen(false)
  }, [pathname])

  const _signOutHandler = () => {
    signOutHandler()
    setIsOpen(false)
  }
  const _signInHandler = () => {
    signInHandler()
    setIsOpen(false)
  }
  return (
    <div className="bg-gray-1 navbar-shadow fixed top-0 z-[999] flex w-screen px-8 pt-3 md:px-4">
      <div className="flex w-full">
        <Logo />
        <div
          className={`left-0 md:ml-auto ${isOpen ? "flex" : "hidden"} bg-gray-1 absolute top-12 h-fit min-h-screen
          w-full flex-col items-center justify-start gap-2 self-end pt-8 md:relative md:top-0 md:ml-auto
          md:flex md:min-h-full md:flex-row md:items-end md:justify-end md:gap-8 md:bg-none md:pr-4 md:pt-0`}
        >
          <WrappedTab to="/">Home</WrappedTab>
          <WrappedTab to="/bookings">Book the Lodge!</WrappedTab>
          <WrappedTab to="/events">Events</WrappedTab>
          <span className="hidden md:block">
            <WrappedMenuTab displayName="about" to="/about">
              <AboutMenuItemsFull />
            </WrappedMenuTab>
          </span>
          <AboutMenuItemsMobile />
          <InstagramLink />
          <LoginIndicator
            isAdmin={isAdmin}
            isLoggedIn={isLoggedIn}
            signOutHandler={_signOutHandler}
            signInHandler={_signInHandler}
          />
        </div>

        <div className="ml-auto flex gap-x-4 pt-[5px] md:hidden">
          <InstagramLink />
          <div
            className={`h-[20px] w-[24px] cursor-pointer 
            ${isOpen ? "stroke-light-blue-100" : "stroke-black"} " pt-[5px]`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <HamburgerIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
