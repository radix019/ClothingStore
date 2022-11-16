import React from "react";
import SignIn from "../../components/signin/signin";
import Signup from "../../components/signup/signup";
import "./authentication.scss";
interface AuthenticationProps {}

const Authentication: React.FunctionComponent<AuthenticationProps> = () => {
  return (
    <>
      <div className="authentication-container">
        <SignIn />
        <Signup />
      </div>
    </>
  );
};

export default Authentication;
