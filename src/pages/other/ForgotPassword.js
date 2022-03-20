import PropTypes from "prop-types";
import React, { Fragment, useState,useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { fetchApi } from '../../services/api';
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";


const ForgotPassword = ({ location }) => {
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const { addToast } = useToasts();

  const { pathname } = location;
  const [show, setshow] = useState(false)
  const [forgotPassword, setForgotPassword] = useState({
    email: " ",
    redirectToReferrer: false
  });

  const { email, redirectToReferrer } = forgotPassword;


  const handleChange = name => event => {
    if(name==="email")
    {
      if(event.target.value.length<=10)
      {
        setForgotPassword({ ...forgotPassword, error: false, [name]: event.target.value });

      }
    }
  };


  const handleSubmit = event => {
    event.preventDefault();
    // setForgotPassword({ ...forgotPassword, redirectToReferrer: true });
   if(email.length!==10)
   {
    addToast("Mobile Number must be of 10 digits", { appearance: "warning", autoDismiss: true });
     return 0 
   }
    let obj = {
      "mobile": email,
    }


    return fetchApi('/forgotpassword/sendOTP', obj, {}, false, 'post')
      .then(response => {
        if (response.data.message === 'sent') {

          addToast("Otp sent successfully", { appearance: "success", autoDismiss: true });
          setshow(true)

          setForgotPassword({...forgotPassword, redirectToReferrer: true })

          // localStorage.setItem("mobile",email)
        }
        else {

          addToast("Please Register to Continue", { appearance: "error", autoDismiss: true });

        }
      })
      .catch(err => console.log("error ->", err));

  };

  const redirectPasswordReset = () => {
    if (redirectToReferrer) {

      return <Redirect to={process.env.PUBLIC_URL + "/password-reset?mobile=" + email} />
    }
    // else{
    //   return <Redirect to={process.env.PUBLIC_URL + "/forgot-password"}/>
    // }
  };



  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech</title>
        <meta
          name="description"
          content="Utsav Plasto Tech"
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Forgot Password
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
                          <h4>Forgot Password</h4>
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
                                required={true}
                                minLength={10}
                                autoComplete={'' + Math.random()}
                                name="user-name"
                                placeholder="Enter Mobile Number"
                                onChange={handleChange("email")}
                                value={email}
                              />
                              <div className="button-box">
                                <button type="submit" style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#ffffff' }}>
                                  {show === true ? (<span>send otp</span>) : (<span>send otp</span>)}
                                </button>
                                {/* <button type="submit" style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#ffffff',marginLeft:'4%' }}>
                                  {show === true ? (<span>Resend otp</span>) : (<span>Resend otp</span>)}
                                </button> */}
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>

                    </Tab.Content>
                  </Tab.Container>
                  {redirectPasswordReset()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  location: PropTypes.object
};

export default ForgotPassword;
