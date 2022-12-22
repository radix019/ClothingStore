import React, { createContext } from "react";
import { User } from "firebase/auth";
import {
  createUserDocument,
  onAuthStateChangedLister,
} from "../_api/firebaseConfig";
import produce from "immer";
import { USER_ACTION_TYPE } from "../_global/_Enum";

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
      return produce(state, (draft) => {
        draft.loggedInUser = userAuth;
      });

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
  const [userReducer, userReducerDispatch] = React.useReducer(
    UserReducer,
    initUserState
  );

  const value = { loggedInUser: userReducer.loggedInUser };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChangedLister((user) => {
      if (user) {
        createUserDocument(user);
      }
      userReducerDispatch({
        type: USER_ACTION_TYPE.SET_LOGGEDIN_USER,
        payload: user,
      });
    });
    return unsubscribe;
  }, []);
  return (
    <UserAuthContext.Provider value={value}>
      {authProps.children}
    </UserAuthContext.Provider>
  );
});
