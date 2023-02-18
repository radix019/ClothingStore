import SignIn from "./signin/signin";
import Signup from "./signup/signup";
import "./authentication.scss";

const Auth = () => {
  return (
    <>
      <div className="authentication-container">
        <SignIn />
        <Signup />
      </div>
    </>
  );
};

export default Auth;
