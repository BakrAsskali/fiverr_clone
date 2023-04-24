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
    <div className="signup">
      <h1>
        Join as a client or
        <br /> as a freelancer
      </h1>
      <div className={Classnames("container", "account_type")}>
        <div
          className="client"
          style={{
            flex: 1,
            display: "grid",
            overflow: "visible",
            margin: "50px",
            backgroundColor: "#EDDE8C",
            height: "70%",
          }}
        >
          <h2>Client</h2>
          <p>I'm a client, hiring for a project</p>
          <button
            style={{
              backgroundColor: "darkgray",
            }}
          >
            <a href="/client">Sign up as a client</a>
          </button>
        </div>
        <div
          className="freelancer"
          style={{
            flex: 1,
            display: "grid",
            overflow: "visible",
            margin: "50px",
            backgroundColor: "#EDDE8C",
            height: "70%",
          }}
        >
          <h2>Freelancer</h2>
          <p>I'm a freelancer looking for work</p>
          <button
            style={{
              backgroundColor: "darkgray",
            }}
          >
            <a href="/freelancer">Sign up as a freelancer</a>
          </button>
        </div>
      </div>
      <div className="noaccount">
        <p>Already have an account?</p>
        <a href="/login">Log in</a>
      </div>
    </div>
  );
};
