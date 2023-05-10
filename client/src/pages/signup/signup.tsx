import { Grid } from "@chakra-ui/react";
import Classnames from "classnames";
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
    <>
      <h1>Sign Up</h1>
      <Grid templateColumns="1fr 1fr" bg="gray.50"></Grid>
    </>
  );
};
