import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
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
    <Card
      p="20"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,50%)",
      }}
    >
      <h1>Login</h1>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input placeholder="Username" ref={usernameRef} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input placeholder="Password" type="password" ref={passwordRef} />
      </FormControl>
      <button onClick={handleSubmit}>Login</button>
      <Text textAlign="center">----------------Or---------------</Text>
      <FormControl
        style={{
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <GoogleLogin
          onSuccess={responseMessage}
          onError={errorMessage}
        ></GoogleLogin>
        <Text>Don't have and account?</Text>
        <a href="/signup">
          <Button>Signup</Button>
        </a>
      </FormControl>
    </Card>
  );
};
