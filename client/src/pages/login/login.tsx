import { gql, useMutation } from "@apollo/client";
import { GoogleLogin } from "@react-oauth/google";
import { useRef } from "react";
import { useCookies } from "react-cookie";
import { useHref } from "react-router-dom";
import "../../assets/styles/Login.css";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      firstName
      lastName
      username
      username
      phoneNumber
      type
      profilePicture
      bio
      skills
      education
      experience
      languages
      hourlyRate
      rating
      reviews
      gigs
      createdAt
      updatedAt
      userJwtToken {
        token
      }
    }
  }
`;

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
    const enteredUsername = usernameRef.current!.value;
    const enteredPassword = passwordRef.current!.value;

    if (
      enteredUsername.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      return;
    }

    await login({
      variables: {
        username: enteredUsername,
        password: enteredPassword,
      },
    }).then((response) => {
      useHref("/");
    });
  };

  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = () => {
    console.log("error");
  };

  const [cookies, setCookie, removeCookie] = useCookies(["userJwtToken"]);

  function onLoginSuccess(response: any) {
    console.log(response);
    setCookie("userJwtToken", response.accessToken, { path: "/" });
    console.log(cookies);
  }

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    },

    onCompleted: (data, error) => {
      console.log(data);
      onLoginSuccess(data.login.userJwtToken);
    },
  });

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
  }

  return (
    <form className="Login" onSubmit={handleSubmit}>
      <h1>Sign in</h1>
      <div className="input_field">
        <input
          ref={usernameRef}
          type="username"
          className="validate"
          placeholder="Username"
        />
      </div>
      <div className="input_field">
        <input
          ref={passwordRef}
          type="password"
          className="validate"
          placeholder="Password"
        />
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
