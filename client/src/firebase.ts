// setup firebase
import { initializeApp, type FirebaseOptions } from "@firebase/app"
import { getAuth } from "@firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "@firebase/firestore"
import { ParsedToken } from "firebase/auth"
import { UserClaims } from "models/User"
import fetchClient, { setToken } from "services/OpenApiFetchClient"
import { StoreInstance } from "store/store"

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// use emulator suite if running locally
if (import.meta.env.VITE_NODE_ENV !== "production") {
  connectFirestoreEmulator(db, "localhost", 8080)
}

auth.onIdTokenChanged(async (user) => {
  if (user === null) {
    // suggests a log out
    StoreInstance.actions.resetCurrentUserState()
    return
  }

  // fetch token
  let token: string, claims: ParsedToken
  try {
    ;({ token, claims } = await user.getIdTokenResult())
  } catch (error) {
    console.error(`Failed to handle auth token change: ${error}`)
    return
  }

  // update fetch client token to use
  setToken(token)

  // retrieve and update cached user data
  let userData
  try {
    const { data } = await fetchClient.GET("/users/self")
    userData = data
  } catch (error) {
    console.error(
      `Failed to fetch user data during auth token change: ${error}`
    )
  }

  StoreInstance.actions.setCurrentUser(user, userData, claims as UserClaims)
})

export { auth, db }
