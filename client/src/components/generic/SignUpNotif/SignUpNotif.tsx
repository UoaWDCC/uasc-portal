import { useRouter } from "next/navigation"
import Button from "../FigmaButtons/FigmaButton"
import LockIcon from "@/assets/icons/lock.svg"

interface ISignUpNotif {
  /**
   * If there is a currently signed in user which determines the view to be shown
   */
  signedIn?: boolean
}

/**
 * For use in the bookings page when a non-signed in/guest member tries to view
 */
export const SignUpNotif = ({ signedIn }: ISignUpNotif) => {
  const router = useRouter()
  function goToRegister() {
    router.push("/register")
  }
  function goToLogin() {
    router.push("/login")
  }

  return (
    <div
      className="border-gray-3 flex max-h-[402px] max-w-[570px] flex-col items-center justify-center 
    gap-4 rounded-md border bg-white py-8 text-black"
    >
      <div>
        <LockIcon />
      </div>
      <h2 className="text-center italic"> Sorry!</h2>
      <h4 className="max-h-[87px] max-w-[407px] text-center">
        Bookings are only available for UASC members.
      </h4>
      <h4 className="max-h-[87px] max-w-[407px] text-center">
        Please sign up or wait until your membership payment has been processed.
      </h4>
      <span className="mt-2 flex w-full max-w-80 gap-2">
        {!signedIn && <Button onClick={() => goToLogin()}>Log in</Button>}
        <Button onClick={() => goToRegister()}>
          {signedIn ? "Join Now" : "Sign up"}
        </Button>
      </span>
    </div>
  )
}
