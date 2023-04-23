import "@/styles/client.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import classNames from "classnames";

export interface ClientProps {
  className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-clients-and-templates
 */
export const Client = ({ className }: ClientProps) => {
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };
  return (
    <>
      <div>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        <p>--------------------------or--------------------------</p>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="first-name"
                  placeholder="Enter first name"
                />
              </div>
              <div>
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
                  placeholder="Enter phone"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="Required"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
