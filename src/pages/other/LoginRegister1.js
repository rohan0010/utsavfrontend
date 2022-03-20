import md5 from 'md5';
import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import MetaTags from 'react-meta-tags';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { authenticate } from '../../auth';
import LayoutOne from '../../layouts/LayoutOne';
import { fetchcarts } from '../../redux/actions/cartActions';
import { fetchwishlists } from '../../redux/actions/wishlistActions';
import { fetchApi } from '../../services/api';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './style.css';
import config from '../../config';

const LoginRegister = ({ location }) => {
  var user_string = require("randomstring").generate(6);
  // console.log("user_string", user_string);
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const[seconds,setseconds]=useState(0)
  
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
  const { pathname } = location;
  const [signin, setSignin] = useState({
    loginId: '',
    loginPassword: '',
    rememberMe: '',
    loading: false,
    redirectToReferrer: false,
  });
  const [signup, setSignup] = useState({
    userEmail: '',
    mobile: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    referCode: '',
  });
  const {
    loginId,
    loginPassword,
    rememberMe,
    loading,
    redirectToReferrer,
  } = signin;
  const { userEmail, mobile, password, firstName, lastName, referCode } = signup;
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [session, setsession] = useState('');
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState(false);
  const [send, setSend] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [timeCount, setTimeCount] = useState(false);
  const [otpWrong, setOtpWrong] = useState('')
  const [passwordHide, setPasswordHide] = useState(true);

  const passwordShow = () => {
    setPasswordHide(false);
  }
  const passwordShowHide = () => {
    setPasswordHide(true);
  }
 const[usethis,setusethis]=useState("")
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const referral = urlParams.get('referCode');
  const [mobileError, setMobileError] = useState('');

  useEffect(() => {
    setSignup({ ...signup, referCode: referral });
  }, []);


  const [mobileSignup, setMonileSignup] = useState({
    MobileNumber: '',
    CountryCode: '+91',
  });

  const {
    MobileNumber,
    CountryCode,
  } = mobileSignup;


  const [otpSignup, setOtpSignup] = useState({
    otpCode: '',
  });
  const {
    otpCode
  } = otpSignup;

  const getCountTimeout = () => {
    setTimeout(() => {
      setTimeCount(true);
    }, 25000);
  };

  const handleMobileUpdateChange = (name) => (event) => {
    setMonileSignup({ ...mobileSignup, error: false, [name]: event.target.value });
  };

  const handleOtpChange = (name) => (event) => {
    setOtpSignup({ ...otpSignup, error: false, [name]: event.target.value });
  };


  const mobileUpdateSubmit = (event) => {
    event.preventDefault();
    setMonileSignup({ ...mobileSignup, error: false, loading: true });
    if (mobileSignup.MobileNumber.length < 10) {
      setError('Mobile Number should be greater than 10');
    } else {
      let obj = {
        mobileNumber: mobileSignup.MobileNumber,
        countryCode: mobileSignup.CountryCode,
      };
      return fetchApi('/profile/updateMobile', obj, {}, true, 'post')
        .then((response) => {
         
          if (response.data.message === 'success') {

            // setIsCode(true);
            // setPhone(mobileSignin.mobileLoginId);
            // getCountTimeout();
            setSend(true);
            getCountTimeout();


          } else {
          }
        })
        .catch((err) => console.log('error ->', err));
    }
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    setOtpSignup({ ...otpSignup, error: false, loading: true });
    // if (otpSignup.otpCode.length < 6) {
    //   setError('otp should be equal to 6');
    // } else {
      let obj = {
        mobile:signup.mobile,
        code: otpSignup.otpCode
      };
      
      fetch(config.url+'/profile/verifyOTP2', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' :"Bearer "
       + session
        },
        body: JSON.stringify({
          mobile:signup.mobile,
          code: otpSignup.otpCode
        }),
      })
      .then(response => response.json())
        .then((res) => {
                 if (res.message === 'success') {
            // addToast('Login Successfull', {
            //   appearance: 'success',
            //   autoDismiss: true,
            // });
            setOtp(true);
      localStorage.setItem(
                'access_token',
                res.userData.sessionId
              );
              localStorage.setItem('userId', res.userData.userId);
              localStorage.setItem('useremail', res.userData.userEmail);
              localStorage.setItem('username', res.userData.username);
              localStorage.setItem(
                'fullname',
                res.userData.userInfo.firstName.concat(
                  res.userData.userInfo.lastName
                )
              );
              authenticate(res.userData.sessionId, () => {
                setSignin({
                  ...signin,
                  redirectToReferrer: true,
                });
                // setShow(true);
              });
            setRedirectToHome(true);

          } else {
            // setRedirectToHome(true);
            setOtpWrong('Please Enter Valid OTP.')
          }
          // alert('Thank You! Your application has been submitted successfully');
        })
        .catch((err) => console.log(err));
  
      // return fetchApi('/profile/verifyOTP2', obj, {}, false, 'post')
      //   .then((response) => {
      //     console.log("response-->", response);
      //     console.log("Response", response.data.message);
      //     if (response.data.message === 'success') {
      //       addToast('Login Successfull', {
      //         appearance: 'success',
      //         autoDismiss: true,
      //       });
      //       setOtp(true);
      //       console.log("verify otp");
      // localStorage.setItem(
      //           'access_token',
      //           response.data.userData.sessionId
      //         );
      //         localStorage.setItem('userId', response.data.userData.userId);
      //         localStorage.setItem('useremail', response.data.userData.userEmail);
      //         localStorage.setItem('username', response.data.userData.username);
      //         localStorage.setItem(
      //           'fullname',
      //           response.data.userData.userInfo.firstName.concat(
      //             response.data.userData.userInfo.lastName
      //           )
      //         );
      //         authenticate(response.data.userData.sessionId, () => {
      //           setSignin({
      //             ...signin,
      //             redirectToReferrer: true,
      //           });
      //           // setShow(true);
      //         });
      //       setRedirectToHome(true);

      //     } else {
      //       console.log('rjah', response.data.message);
      //       // setRedirectToHome(true);
      //       setOtpWrong('Please Enter Valid OTP.')
      //     }
      //   })
      //   .catch((err) => console.log('error ->', err));
   
  };


  // -----------------------------------------------------

  const handleClose = () => {
    setShow(false);
  };
  // const handleShow = () => setShow(true);

  const responseFacebook = (response) => {
    // console.log(response);
    //anything else you want to do(save to localStorage)...
  };
  const handleSubmit22 = event => {
    // event.preventDefault();
    // setForgotPassword({ ...forgotPassword, redirectToReferrer: true });

    let obj = {
      "username": usethis,
      "mobile":"+91"+mobile
    }


    return fetchApi('/signup/resendVerificationCode', obj, {}, false, 'post')
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
  const handleChange = (name) => (event) => {
    setSignin({ ...signin, error: false, [name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSignin({ ...signin, error: false, loading: true });
    if (signin.loginPassword.length < 6) {
      setError('Password Length should be greater than 6');
    } else {
      let obj = {
        loginId: signin.loginId,
        loginPassword: md5(signin.loginPassword),
        rememberMe: false,
      };
      // console.log("Obj", obj);
      return fetchApi('/login/login', obj, {}, false, 'post')
        .then((response) => {
          // console.log("Response", response.data.message);
          if (response.data.message === 'success') {
            // addToast('Login Successfull', {
            //   appearance: 'success',
            //   autoDismiss: true,
            // });
            localStorage.setItem(
              'access_token',
              response.data.userData.sessionId
            );
            localStorage.setItem('userId', response.data.userData.userId);
            localStorage.setItem('useremail', response.data.userData.userEmail);
            localStorage.setItem('username', response.data.userData.username);
            localStorage.setItem(
              'fullname',
              response.data.userData.userInfo.firstName.concat(
                response.data.userData.userInfo.lastName
              )
            );
            authenticate(response.data.userData.sessionId, () => {
              setSignin({
                ...signin,
                redirectToReferrer: true,
              });
            });
            dispatch(fetchcarts(addToast));
            dispatch(fetchwishlists(addToast));
          } else {
            if (response.data.message === 'You have been banned') {
              setError('You are banned to use further services.');
            } else {
              setError('Invalid Credentials');
            }
            // addToast("Invalid Credentials", { appearance: "error", autoDismiss: true });
          }
        })
        .catch((err) => console.log('error ->', err));
    }
  };

  const handleChange1 = (name) => (event) => {
    setSignup({ ...signup, error: false, [name]: event.target.value });
  };
  const handleSubmit1 = (event) => {
    event.preventDefault();
    if (signup.mobile.length == 10) {
      if (signup.password.length < 6) {
        setError1('Password Length should be greater than 6');
      } else {
        setSignup({ ...signup, error: false, loading: true });
        let obj = {
          userEmail: signup.userEmail,
          username: user_string,
          mobile: "+91" + signup.mobile,
          password: md5(signup.password),
          role: 'user',
          firstName: signup.firstName,
          lastName: signup.lastName,
          referCode: signup.referCode,
        };
        return fetchApi('/signup/registerUser', obj, {}, false, 'post')
          .then((response) => {
            if (response.data.message === 'success') {
              // addToast('Signup Successfull', {
              //   appearance: 'success',
              //   autoDismiss: true,
              // });
              setsession(response.data.userData.sessionId)
              // localStorage.setItem(
              //   'access_token',
              //   response.data.userData.sessionId
              // );
              // localStorage.setItem('userId', response.data.userData.userId);
              // localStorage.setItem('useremail', response.data.userData.userEmail);
              // localStorage.setItem('username', response.data.userData.username);
              // localStorage.setItem(
              //   'fullname',
              //   response.data.userData.userInfo.firstName.concat(
              //     response.data.userData.userInfo.lastName
              //   )
              // );
              // authenticate(response.data.userData.sessionId, () => {
                setSignin({
                  ...signin,
                  redirectToReferrer: true,
                });
                setShow(true);
                setusethis(user_string)
                setseconds(30)

              // });
              // dispatch(fetchcarts(addToast));
              // dispatch(fetchwishlists(addToast));
            } else {
              addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: true,
              });
            }
          })
          .catch((err) => console.log('error ->', err));
      }
    } else {
      setMobileError('Mobile Length should be 10 digits')
    }
  };
  const redirectUser = () => {
    if (redirectToHome) {
      return <Redirect to={'/'} />;
    }
  };


  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }



  return (
    <Fragment>
      <MetaTags>
        <title>Al Aroma Leafs</title>
        <meta
          name='description'
          content='Al Aroma Leafs'
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Register
      </BreadcrumbsItem>
      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className='login-register-area pt-100 pb-100'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-7 col-md-12 ml-auto mr-auto'>
                <div className='login-register-wrapper'>
                  <div className='login-form-container'>
                    <div className='login-register-form'>
                      <form                                         autoComplete={'' + Math.random()}
 onSubmit={handleSubmit1}>
                        <input
                          type='text'
                          name='first-name'
                          placeholder='First Name'
                          onChange={handleChange1('firstName')}
                                                                  autoComplete={'' + Math.random()}

                          value={firstName}
                          required={true}
                        />
                        <input
                          type='text'
                          name='last-name'
                          placeholder='Last Name'
                                                                  autoComplete={'' + Math.random()}

                          onChange={handleChange1('lastName')}
                          value={lastName}
                        />
                        <input
                          type='email'
                          name='user-email'
                          placeholder='User Email'
                                                                  autoComplete={'' + Math.random()}

                          onChange={handleChange1('userEmail')}
                          value={userEmail}
                        />
                        <input
                          type='number'
                          name='user-mobile'
                          placeholder='Mobile number'
                          onChange={handleChange1('mobile')}
                                                                  autoComplete={'' + Math.random()}

                          value={mobile}
                          required={true}
                          maxLength="10"
                          onInput={maxLengthCheck}
                          onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
                        />

                        <div class="input-group mb-2 mr-sm-2">
                          <input
                            type={passwordHide ? "password" : "text"}
                            name="user-password"
                            class="form-control"
                            required={true}
                                                                    autoComplete={'' + Math.random()}
                                                                    minLength={8}
                            id="inlineFormInputGroupUsername2"
                            placeholder="Password"
                            onChange={handleChange1("password")}
                            value={password}
                          />

                          <div class="input-group-prepend" style={{ height: '45px' }}>
                            <div class="input-group-text bg-white" >{passwordHide ? <i className="fa fa-eye" style={{ color: '#00295F', fontSize: '22px', cursor: 'pointer' }} onClick={passwordShow}></i> : <i className="fa fa-eye-slash" style={{ color: '#00295F', fontSize: '22px', cursor: 'pointer' }} onClick={passwordShowHide}></i>}</div>
                          </div>
                        </div>
                       
                        <h6 style={{ color: 'red' }}>{mobileError}</h6>
                        <h6 style={{ color: 'red' }}>{error1}</h6>
                        <div className='button-box'>
                          <button style={{ backgroundColor: 'rgb(0, 41, 95)', color: 'white' }} type='submit'>
                            <span>Register</span>
                          </button>
                        </div>
                        <br />
                        <p>If you are a registered customer, please <Link to={process.env.PUBLIC_URL + '/login'} style={{ color: 'rgb(0, 41, 95)', fontWeight: 'bold' }}>log in</Link></p>
                      </form>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            <Modal show={show} className="register-mobile-popup" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Verify Mobile Number with OTP</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <div className="row">

                  <form                                         autoComplete={'' + Math.random()}
 onSubmit={handleOtpSubmit}>

                    <div className="col">
                      <input
                        type='text'
                        name='last-name'
                        placeholder='Enter OTP'
                        className="mt-3"
                        required={true}
                                                                autoComplete={'' + Math.random()}

                        onChange={handleOtpChange('otpCode')}
                        value={otpCode}
                      />
                    </div>
                    <span className="text-center ml-3 text-danger">{otpWrong}</span>
                    <div className="col">
                      <div className='button-box'>
                        <button style={{ backgroundColor: 'rgb(0, 41, 95)', color: 'white', border: '1px solid rgb(0, 41, 95)', marginTop: 20, marginLeft: 10 }} type='submit'>
                          <span>verify OTP</span>
                        </button>
                      </div>
                    </div>

                  </form>

                  <form onClick={(event)=>event.preventDefault()}>
                            <div className="button-box">
                            <button style={{ backgroundColor: 'rgb(0, 41, 95)', color: 'white', border: '1px solid rgb(0, 41, 95)', marginTop: 106, marginLeft: -10 }} >
                         
                           {  seconds === 0
                    ? <span onClick={handleSubmit22}> Resend OTP</span>
                    :  <span>Resend OTP After: {seconds < 10 ? `0${seconds}` : seconds} </span>
                }
                       
                                 
                                </button>
                                </div>
                            </form>
                  <div className="col">
                    {timeCount ? (

                      <form                                         autoComplete={'' + Math.random()}
                      onSubmit={mobileUpdateSubmit}>
                        <input
                          type='hidden'
                          name='last-name'
                          placeholder='Verify Phone'
                                                                  autoComplete={'' + Math.random()}

                          onChange={handleMobileUpdateChange('MobileNumber')}
                          value={MobileNumber}
                        />
                        <div className='button-box'>
                          <button style={{ backgroundColor: 'rgb(0, 41, 95)', color: 'white', border: '1px solid rgb(0, 41, 95)', marginTop: 20, marginLeft: 10 }} type='submit'>
                            <span>Resend OTP</span>
                          </button>
                        </div>
                      </form>
                    ) : ""}
                  </div>

                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>

              </Modal.Footer>
            </Modal>


            {/* 
            <Modal show={show} className="register-mobile-popup" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Verify Mobile Number with OTP</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {!send ? (
                  <form onSubmit={mobileUpdateSubmit}>
                    <input
                      type='text'
                      name='last-name'
                      placeholder='Verify Phone'
                      required={true}
                      onChange={handleMobileUpdateChange('MobileNumber')}
                      value={MobileNumber}
                    />
                    <br />
                    <div className='button-box'>
                      <button style={{ backgroundColor: '#A1C51D', color: 'white', border: '1px solid #A1C51D', marginTop: 20, marginLeft: 10 }} type='submit'>
                        <span>Send OTP</span>
                      </button>
                    </div>
                  </form>)
                  : (

                    <div className="row">
                     
                      <form onSubmit={handleOtpSubmit}>

                        <div className="col">
                          <input
                            type='text'
                            name='last-name'
                            placeholder='Enter OTP'
                            className="mt-3"
                            required={true}
                            onChange={handleOtpChange('otpCode')}
                            value={otpCode}
                          />
                        </div>
                        <div className="col">
                          <div className='button-box'>
                            <button style={{ backgroundColor: '#A1C51D', color: 'white', border: '1px solid #A1C51D', marginTop: 20, marginLeft: 10 }} type='submit'>
                              <span>verify OTP</span>
                            </button>
                          </div>
                        </div>
                      </form>

                   
                      <div className="col">
                        {timeCount ? (

                          <form onSubmit={mobileUpdateSubmit}>
                            <input
                              type='hidden'
                              name='last-name'
                              placeholder='Verify Phone'
                              onChange={handleMobileUpdateChange('MobileNumber')}
                              value={MobileNumber}
                            />
                            <div className='button-box'>
                              <button style={{ backgroundColor: '#A1C51D', color: 'white', border: '1px solid #A1C51D', marginTop: 20, marginLeft: 10 }} type='submit'>
                                <span>Resend OTP</span>
                              </button>
                            </div>
                          </form>
                        ) : ""}
                      </div>
                    
                    </div>

                  )
                }

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>

              </Modal.Footer>
            </Modal> */}




            {redirectUser()}
          </div>
        </div>
      </LayoutOne>
    </Fragment >
  );
};
LoginRegister.propTypes = {
  location: PropTypes.object,
};
export default LoginRegister;
