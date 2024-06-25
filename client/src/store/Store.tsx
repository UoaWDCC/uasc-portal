import { User } from "firebase/auth"
import { UserAdditionalInfo, UserClaims } from "models/User"
import {
  defaultRegistry,
  createStore,
  Action,
  createHook
} from "react-sweet-state"

export const CACHED_USER_LOCAL_STORAGE_KEY = "stored-user"

export type State = {
  currentUser: User | null // firebase type
  currentUserData?: UserAdditionalInfo
  currentUserClaims?: UserClaims
}

const defaultUserState = {
  currentUser: null,
  currentUserClaims: undefined,
  currentUserData: undefined
}

const initialState: State = {
  ...defaultUserState
}

const actions = {
  setCurrentUser:
    (
      user: User | null,
      userData: UserAdditionalInfo | undefined,
      userClaims: UserClaims | undefined
    ): Action<State> =>
    ({ setState }) => {
      setState({
        currentUser: user,
        currentUserData: userData,
        currentUserClaims: userClaims
      })
      localStorage.setItem(
        CACHED_USER_LOCAL_STORAGE_KEY,
        JSON.stringify({ user, userData, userClaims })
      )
    },
  resetCurrentUserState:
    (): Action<State> =>
    ({ setState }) => {
      setState({ ...defaultUserState })

      localStorage.removeItem(CACHED_USER_LOCAL_STORAGE_KEY)
    },
  refreshUserToken:
    (): Action<State> =>
    async ({ setState, getState }) => {
      const { currentUser } = getState()
      if (currentUser) {
        try {
          /** Refresh the ID token for the current user */
          await currentUser.getIdToken(true)
        } catch (error) {
          /** If an error occurs while refreshing the token, reset the user state and log the error */
          setState({ ...defaultUserState })
          console.error("Error refreshing ID token:", error)
        }
      }
    }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  initialState,
  actions
})

export const StoreInstance = defaultRegistry.getStore(Store)

export const useAppData = createHook(Store)
