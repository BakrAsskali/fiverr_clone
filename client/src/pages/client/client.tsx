import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { Checkbox, FormControlLabel } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import "../../assets/styles/client.css";

const setUser = gql`
  mutation setUser($user: UserInput!) {
    setUser(user: $user) {
      id
      firstName
      lastName
      email
      password
      type
    }
  }
`;

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-clients-and-templates
 */
export const Client = () => {
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = () => {
    console.log("error");
  };
  return (
    <>
      <div className="client_register">
        <p className="title">Sign up to hire a talent</p>
        <div className="container">
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
        <div className="container">
          <p>
            -------------------------------------------------------------------------------------------or-------------------------------------------------------------------------------------------
          </p>
        </div>
        <form className="form-container">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="first-name"
                placeholder="Enter first name"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="last-name"
                placeholder="Enter last name"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="confirm_password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter phone number"
              />
            </div>
            <div className="privacy">
              <FormControlLabel
                required
                control={<Checkbox />}
                label="Yes, I understand and agree to the Upwork Terms of Service , including the User Agreement and Privacy Policy ."
              />
            </div>
            <div className="form-group bouton">
              <button type="submit" className="btn btn-primary">
                Create my account
              </button>
            </div>
            <div className="form-group bouton">
              <p>Already have an account? </p>
              <a href="/login" className="link">
                Sign in
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default graphql(setUser)(Client);
