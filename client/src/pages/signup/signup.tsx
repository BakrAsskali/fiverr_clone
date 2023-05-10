import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Classnames from "classnames";
import { useHref } from "react-router-dom";
import "../../assets/styles/Signup.css";

export interface SignupProps {
  className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-signups-and-templates
 */
export const Signup = ({ className }: SignupProps) => {
  return (
    <Card
      p="10"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,50%)",
      }}
    >
      <h1>Signup</h1>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <Card>
          <CardHeader>
            <Heading size="md"> Signup as a client</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              I'm a client looking to hire a freelancer to complete a project.
            </Text>
          </CardBody>
          <CardFooter>
            <a href="/client">
              <Button>Signup as a client</Button>
            </a>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">Signup as a freelancer</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              I'm a freelancer looking to find work and complete projects.
            </Text>
          </CardBody>
          <CardFooter>
            <a href="/freelancer">
              <Button>Signup as a freelancer</Button>
            </a>
          </CardFooter>
        </Card>
      </SimpleGrid>
      <h6
        style={{
          textAlign: "center",
          color: "blue",
        }}
      >
        Already have an account?
      </h6>
      <a
        href="/login"
        style={{
          textAlign: "center",
        }}
      >
        <Button>Login</Button>
      </a>
    </Card>
  );
};
