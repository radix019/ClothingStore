import { User } from "firebase/auth";
import React, { createContext } from "react";
import {
  createUserDocument,
  onAuthStateChangedLister,
} from "../utils/firebase/firebaseConfig";

interface UserAuth {
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserAuthContext = createContext<UserAuth>({
  loggedInUser: null,
  setLoggedInUser: () => null,
});

interface UserAuthProps {
  children?: React.ReactNode;
}

export const UserAuthProvider = React.memo<UserAuthProps>((authProps) => {
  const [loggedInUser, setLoggedInUser] = React.useState<User | null>(null);

  const value = { loggedInUser, setLoggedInUser };
  React.useEffect(() => {
    const unsubscribe = onAuthStateChangedLister((user) => {
      if (user) {
        createUserDocument(user);
      }
      setLoggedInUser(user);
    });
    return unsubscribe;
  });
  return (
    <UserAuthContext.Provider value={value}>
      {authProps.children}
    </UserAuthContext.Provider>
  );
});
