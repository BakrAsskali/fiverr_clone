import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Message.css";

export const Message: React.FC = () => {
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">MESSAGES</Link> {">"} JOHN DOE {">"}{" "}
        </span>
        <div className="messages">
          <div className="item">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
              The company itself is a very successful company. Right them Do you
              see the flexibility of the services with pleasure? I followed those
              duties if we can, with regular effort, other flexibility will occur
              that no one pleases laborious except for the mind! Error, it is held!
            </p>
          </div>
          <div className="item owner">
            <img
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
              The company itself is a very successful company. Right them Do you
              see the flexibility of the services with pleasure? I followed those
              duties if we can, with regular effort, other flexibility will occur
              that no one pleases laborious except for the mind! Error, it is held!
            </p>
          </div>
        </div>
        <hr />
        <div className="write">
          <textarea
            name=""
            placeholder="write a message"
            id=""
            cols={30}
            rows={10}
          ></textarea>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

