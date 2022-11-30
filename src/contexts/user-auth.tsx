import { User } from "firebase/auth";
import React, { createContext } from "react";
import {
  createUserDocument,
  onAuthStateChangedLister,
} from "../utils/firebase/firebaseConfig";

export enum USER_ACTION_TYPE {
  SET_LOGGEDIN_USER = "SET_LOGGEDIN_USER",
}
interface UserState {
  loggedInUser: User | null;
}

export interface UserAction {
  type: USER_ACTION_TYPE;
  payload: User | null;
}

const initUserState: UserState = {
  loggedInUser: null,
};

export const UserReducer = (state = initUserState, action: UserAction) => {
  switch (action.type) {
    case USER_ACTION_TYPE.SET_LOGGEDIN_USER:
      const userAuth = action.payload as User | null;
      return {
        ...state,
        loggedInUser: userAuth,
      };

    default:
      throw new Error(`Unhandeled type ${action.type} in userReducer`);
  }
};

export const UserAuthContext = createContext<UserState>({
  loggedInUser: null,
});

interface UserAuthProps {
  children?: React.ReactNode;
}

export const UserAuthProvider = React.memo<UserAuthProps>((authProps) => {
  const [userReducer, dispatch] = React.useReducer(UserReducer, initUserState);

  const value = { loggedInUser: userReducer.loggedInUser };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChangedLister((user) => {
      if (user) {
        createUserDocument(user);
      }
      dispatch({ type: USER_ACTION_TYPE.SET_LOGGEDIN_USER, payload: user });
    });
    return unsubscribe;
  }, []);
  return (
    <UserAuthContext.Provider value={value}>
      {authProps.children}
    </UserAuthContext.Provider>
  );
});
