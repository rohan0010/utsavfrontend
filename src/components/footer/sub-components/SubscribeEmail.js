import PropTypes from "prop-types";
import React, { useState } from "react";
import './style.scss';
import { fetchApi } from '../../../services/api';
import { useToasts } from 'react-toast-notifications';

const CustomForm = ({ status, message, onValidated }) => {
  const { addToast } = useToasts();

  const [mail, setmail] = useState("")
  let email;
  const submit = () => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(mail);
    if (result === true) {
      let obj = {
        email: mail
      }
      fetchApi('/subscribe/subscribe', obj, {}, true, 'post')
        .then((response) => {
          if (response.data.message === "success") {
            addToast("Your email has been registered", {
              appearance: 'success',
              autoDismiss: true,
            });

          } else {
            addToast(response.data.message, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        })
        .catch((err) => console.log('error ->', err));
    }
    else {
      addToast("Invalid email", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="subscribe-form">
      <div className="mc-form">
        <div>
          <input
            id="mc-form-email"
            className="email"
            ref={node => (email = node)}
            onChange={(e) => setmail(e.target.value)}
            type="email"
            placeholder="Enter your email address..."
          />
        </div>
        <div className="clear">
          <button onClick={() => submit()} className="button">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {status === "sending" && (
        <div style={{ color: "#3498db", fontSize: "12px" }}>sending...</div>
      )}
      {status === "error" && (
        <div
          style={{ color: "#e74c3c", fontSize: "12px" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "#2ecc71", fontSize: "12px" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </div>
  );
};

const SubscribeEmail = ({ mailchimpUrl }) => {
  return (
    <div>
      <CustomForm />
    </div>
  );
};

SubscribeEmail.propTypes = {
  mailchimpUrl: PropTypes.string
};

export default SubscribeEmail;
