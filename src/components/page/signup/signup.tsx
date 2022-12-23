import React from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import "./signup.scss";
import { createUserDocument } from "../../../_api/firebaseConfig";
import FormInput from "../../common/form-inputs/formInput";
import ActionButton from "../../hoc/buttons/actionButton";

interface Formdata {
  displayName: string;
  email: string | undefined;
  password: string | undefined;
  confirmPasswrod: string;
}

const Signup: React.FunctionComponent = () => {
  const auth = getAuth();
  const [signUpFormData, setSignUpFormData] = React.useState<
    Formdata | undefined
  >();

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpFormData({ ...signUpFormData, [name]: value } as Formdata);
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signUpFormData?.email || !signUpFormData.password) return;
    if (signUpFormData.password !== signUpFormData.confirmPasswrod) return;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        signUpFormData?.email,
        signUpFormData?.password
      );
      const completeInfo = {
        ...response.user,
        displayName: signUpFormData.displayName,
      };
      createUserDocument(completeInfo);
      console.log("User created with email and password");
    } catch (error) {
      console.log("error while creating user with email & password:", error);
    }
    setSignUpFormData({
      displayName: "",
      email: "",
      password: "",
      confirmPasswrod: "",
    });
  };

  return (
    <div className="sign-up-contianer">
      <h2>Don't have account ?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onFormSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={onChangeHandle}
          name="displayName"
          value={signUpFormData?.displayName}
        />

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

        <FormInput
          label="Confirm Password"
          name="confirmPasswrod"
          type="password"
          required
          value={signUpFormData?.confirmPasswrod}
          onChange={onChangeHandle}
        />

        <ActionButton actionType="submit">Sign Up</ActionButton>
      </form>
    </div>
  );
};

export default Signup;
