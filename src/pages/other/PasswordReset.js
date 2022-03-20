import PropTypes from "prop-types";
import React, { Fragment, useState,useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { fetchApi } from '../../services/api';
import { useToasts } from "react-toast-notifications";
import md5 from "md5";
import { Redirect } from "react-router-dom";

const PasswordReset = ({ location }) => {

  const { addToast } = useToasts();
  const [redirect, setRedirect] = useState(false);
  const[seconds,setseconds]=useState(30)
  const { pathname } = location;
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const [resetpassword, setResetPassword] = useState({
    userEmail: '',
    token: '',
    newPassword: '',
    confirmPassword: ""
  });
  const getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
  }
  const {  token, newPassword, confirmPassword } = resetpassword;


  const handleChange = name => event => {
    setResetPassword({ ...resetpassword, error: false, [name]: event.target.value });
  };

  const handleSubmit22 = event => {
    // event.preventDefault();
    // setForgotPassword({ ...forgotPassword, redirectToReferrer: true });

    let obj = {
      "mobile": getQueryVariable('mobile'),
    }


    return fetchApi('/forgotpassword/sendOTP', obj, {}, false, 'post')
      .then(response => {
        if (response.data.message === 'sent') {

          addToast("Otp sent successfully", { appearance: "success", autoDismiss: true });
          setseconds(30)

          // localStorage.setItem("mobile",email)
        }
        else {

          addToast(response.data.message, { appearance: "error", autoDismiss: true });

        }
      })
      .catch(err => console.log("error ->", err));

  };

  useEffect(() => {
    if(seconds===0)
    {
      return
    }
    const intervalId = setInterval(() => {
      setseconds(seconds - 1);
    }, 1000);
    return () => clearInterval(intervalId);
    }, [seconds]);
  const handleSubmit = event => {
    event.preventDefault();
    setResetPassword({ ...resetpassword, error: false, loading: true });
    if (newPassword !== confirmPassword) {
      addToast("Password do not match", { appearance: "error", autoDismiss: true });
    }
    else if (newPassword.length < 6) {
      addToast("Please enter a valid password", { appearance: "error", autoDismiss: true });
    }
    else {
      let obj = {
        "mobile": getQueryVariable('mobile'),
        "token": token,
        "newPassword": md5(newPassword)
      }


      return fetchApi('/forgotpassword/passwordResetMobile', obj, {}, false, 'post')
        .then(response => {
          if (response.data.message === 'success') {
            setRedirect(true);
            addToast("Password Reset successfully", { appearance: "success", autoDismiss: true });
          }
          else {
            addToast("Invalid Otp", { appearance: "error", autoDismiss: true });
          }
        })
        .catch(err => console.log("error ->", err));

    }


  };


  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Password Reset</title>
        <meta
          name="description"
          content="Utsav Plasto Tech"
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Password Reset
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Password Reset</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form                                         autoComplete={'' + Math.random()}
 onSubmit={handleSubmit}>
                              <input
                                type="number"
                                name="user-name"
                                placeholder="Enter code"
                                                                        autoComplete={'' + Math.random()}

                                onChange={handleChange("token")}
                                value={token}
                              />

                              <input
                                type="password"
                                name="user-password"
                                                                        autoComplete={'' + Math.random()}

                                placeholder="Enter Password"
                                onChange={handleChange("newPassword")}
                                value={newPassword}
                              />
                              <input
                                type="password"
                                name="user-password"
                                                                        autoComplete={'' + Math.random()}

                                placeholder="Confirm Password"
                                onChange={handleChange("confirmPassword")}
                                value={confirmPassword}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span onClick={handleSubmit}>Reset Password</span>
                                </button>
                        
                              </div>
                            </form>
                            <form onClick={(event)=>event.preventDefault()}>
                            <div className="button-box">
                            <button style={{marginLeft:"14.4em",position:"absolute",marginTop:"-2.5em"}}>
                           {  seconds === 0
                    ? <span onClick={handleSubmit22}> Resend OTP</span>
                    :  <span>Resend OTP After: {seconds < 10 ? `0${seconds}` : seconds} </span>
                }
                       
                                 
                                </button>
                                </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>

                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>

      {redirect ? <Redirect to={process.env.PUBLIC_URL + "/"} /> : null}
    </Fragment>
  );
};

PasswordReset.propTypes = {
  location: PropTypes.object
};

export default PasswordReset;
