import React from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";

import "./signin.scss";
import { createUserDocument } from "../../../../_api/firebaseConfig";
import FormInput from "../../../common/form-inputs/formInput";
import ActionButton from "../../../hoc/buttons/actionButton";

interface Formdata {
  email: string;
  password: string;
}

const SignIn: React.FunctionComponent = () => {
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();
  const [signUpFormData, setSignUpFormData] = React.useState<Formdata>({
    email: "",
    password: "",
  });

  const onSignInwithPopUp = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };
  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpFormData({ ...signUpFormData, [name]: value } as Formdata);
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signUpFormData?.email || !signUpFormData.password) return;
    try {
      const loggedInUser = await signInWithEmailAndPassword(
        auth,
        signUpFormData.email,
        signUpFormData.password
      );
      createUserDocument(loggedInUser.user);
      console.log("User logged in with email and password");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") {
          alert("User not found.");
        }
      }
      console.log("error message:", error);
    }
    setSignUpFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="sign-up-contianer">
      <h2>Already have account ?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onFormSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          required
          value={signUpFormData?.email}
          onChange={onChangeHandle}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          required
          value={signUpFormData?.password}
          onChange={onChangeHandle}
        />
        <div className="action-container">
          <ActionButton actionType="submit">Sign In</ActionButton>
          <ActionButton onClick={onSignInwithPopUp} ClassType="google">
            Sign In with Google
          </ActionButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
