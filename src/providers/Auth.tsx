import React, { createContext } from "react";
// import { User } from "firebase/auth";
// import produce from "immer";
// import { USER_ACTION_TYPE } from "../_global/_Enum";

// interface UserState {
//   loggedInUser: User | null;
// }

// export interface UserAction {
//   type: USER_ACTION_TYPE;
//   payload: User | null;
// }

// const initUserState: UserState = {
//   loggedInUser: null,
// };

// export const UserAuthContext = createContext<UserState>({
//   loggedInUser: null,
// });

// interface UserAuthProps {
//   children?: React.ReactNode;
// }

// export const UserAuthProvider = React.memo<UserAuthProps>((authProps) => {
//   const [userReducer, userReducerDispatch] = React.useReducer(
//     UserReducer,
//     initUserState
//   );

//   const value = { loggedInUser: userReducer.loggedInUser };

//   return (
//     <UserAuthContext.Provider value={value}>
//       {authProps.children}
//     </UserAuthContext.Provider>
//   );
// });
