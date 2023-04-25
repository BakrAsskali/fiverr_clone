import { GoogleLogin } from "@react-oauth/google";
import "../../assets/styles/Login.css";

export interface LoginProps {
  className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-logins-and-templates
 */
export const Login = () => {
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };
  return (
    <div className="Login">
      <h1>Sign in</h1>
      <div className="input_field">
        <input type="email" className="validate" placeholder="Email" />
      </div>
      <div className="input_field">
        <input type="password" className="validate" placeholder="Password" />
      </div>
      <button className="second_button">Sign in</button>
      <br />
      <p>--------------or---------------</p>
      <div className="google_signin">
        <div id="my-signin2">
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
      </div>
      <div className="signup_link">
        <p>Don't have an account?</p>{" "}
        <a href="/signup" className="link">
          Sign up
        </a>
      </div>
    </div>
  );
};
