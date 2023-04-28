import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import "../../assets/styles/Login.css";

export interface LoginProps {
  className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-logins-and-templates
 */
export const Login = () => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = () => {
    console.log("error");
  };
  return (
    <form className="Login" onSubmit={handleSubmit}>
      <h1>Sign in</h1>
      <div className="input_field">
        <input type="username" className="validate" placeholder="Username" />
      </div>
      <div className="input_field">
        <input type="password" className="validate" placeholder="Password" />
      </div>
      <button className="second_button">Sign in</button>
      <br />
      <div className="google_signin">
        <p>-----------------or----------------</p>
      </div>
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
    </form>
  );
};
