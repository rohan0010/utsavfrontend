import md5 from 'md5';
import PropTypes from 'prop-types';
import React, { Fragment, useState,useEffect } from 'react';
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
import './style.css';

const LoginRegister = ({ location }) => {

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    // eslint-disable-next-line
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  const { addToast } = useToasts();
  const dispatch = useDispatch();
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const { pathname } = location;
  const [signin, setSignin] = useState({
    loginId: '',
    loginPassword: '',
    rememberMe: '',
    loading: false,
    redirectToReferrer: false,
  });
  // --------------------------
  const [phone, setPhone] = useState('');
  const [isCode, setIsCode] = useState(false);
  const [timeCount, setTimeCount] = useState(false);
  const [passwordHide, setPasswordHide] = useState(true);

  const passwordShow = () => {
    setPasswordHide(false);
  }

  const passwordShowHide = () => {
    setPasswordHide(true);
  }

  const [mobileSignin, setMonileSignin] = useState({
    mobileLoginId: '',
  });
  const {
    mobileLoginId,
  } = mobileSignin;

  const [otpSignin, setOtpSignin] = useState({
    otpLoginId: '',
    otpCode: '',
  });
  const {
    otpCode
  } = otpSignin;

  const getCountTimeout = () => {
    setTimeout(() => {
      setTimeCount(true);
    }, 25000);
  };

  const handleMobileChange = (name) => (event) => {
    setMonileSignin({ ...mobileSignin, error: false, [name]: event.target.value });
  };

  const handleOtpChange = (name) => (event) => {
    setOtpSignin({ ...otpSignin, error: false, [name]: event.target.value });
  };

  const handleMobileSubmit = (event) => {
    event.preventDefault();
    setMonileSignin({ ...mobileSignin, error: false, loading: true });
    if (mobileSignin.mobileLoginId.length < 10) {
      setError('Mobile Number should be greater than 10');
    } else {
      let obj = {
        loginId: mobileSignin.mobileLoginId,
      };
      return fetchApi('/login/loginUsingOtp', obj, {}, false, 'post')
        .then((response) => {
    
          if (response.data.message === 'success') {

            setIsCode(true);
            setPhone(mobileSignin.mobileLoginId);
            getCountTimeout();


          } else {
          }
        })
        .catch((err) => console.log('error ->', err));
    }
  };



  const handleOtpSubmit = (event) => {
    event.preventDefault();
    setOtpSignin({ ...otpSignin, error: false, loading: true });
    if (otpSignin.otpCode.length < 6) {
      setError('otp should be equal to 6');
    } else {
      let obj = {
        loginId: phone,
        // loginId: otpSignin.otpLoginId,
        code: otpSignin.otpCode
      };
      return fetchApi('/login/verifyOtp', obj, {}, false, 'post')
        .then((response) => {
     
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
          }
        })
        .catch((err) => console.log('error ->', err));
    }
  };


  // -------------------------
  const [signup, setSignup] = useState({
    userEmail: '',
    username: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
  });
  const {
    loginId,
    loginPassword,
  
    redirectToReferrer,
  } = signin;
  const [error, setError] = useState('');
  // eslint-disable-next-line
  const [error1, setError1] = useState('');
  const [mobileLogin, setMobileLogin] = useState(false);
  // eslint-disable-next-line
  const [otpButton, setOtpButton] = useState(false);
 


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
            
            if (response.data.code === 500) {
              if(response.data.message=="Mobile not verified")
              {
                setError("Mobile not verified")
              }
              else
              {
                setError('Invalid Credentials');
              }
           
              setOtpButton(true);
              // setError('You are banned to use further services.');
            } else {
              setError('Invalid Credentials');
            }
            // addToast("Invalid Credentials", { appearance: "error", autoDismiss: true });
          }
        })
        .catch((err) => console.log('error ->', err));
    }
  };

  const redirectUser = () => {
    if (redirectToReferrer && !getParameterByName('redirectTo')) {
      return <Redirect to={'/'} />;
    }
    else if (redirectToReferrer) {
      return <Redirect to={`/${getParameterByName('redirectTo')}`} />;
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech</title>
        <meta
          name='description'
          content='Utsav Plasto Tech'
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login
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

                      {!mobileLogin ? (
                        <form                                         autoComplete={'' + Math.random()}
                        onSubmit={handleSubmit}>
                          <input
                            type='text'
                            name='user-name'
                                                                   autoComplete={'' + Math.random()}

                            required={true}
                            placeholder='Enter Mobile Number'
                            onChange={handleChange('loginId')}
                            value={loginId}
                          />

                          <div class="input-group mb-2 mr-sm-2">
                            <input
                              type={passwordHide ? "password" : "text"}
                              name="user-password"
                              class="form-control"
                                                                     autoComplete={'' + Math.random()}

                              required={true}
                              style={{ boxShadow: 'none', borderRight: 0 }}
                              id="inlineFormInputGroupUsername2"
                              placeholder="Password"
                              onChange={handleChange("loginPassword")}
                              value={loginPassword}
                            />

                            <div class="input-group-prepend" style={{ height: '45px' }}>
                              <div class="input-group-text bg-white" style={{ borderLeft: 0 }}>{passwordHide ? <i className="fa fa-eye" style={{ color: 'rgb(0, 41, 95)', fontSize: '22px', cursor: 'pointer' }} onClick={passwordShow}></i> : <i className="fa fa-eye-slash" style={{ color: 'rgb(0, 41, 95)', fontSize: '22px', cursor: 'pointer' }} onClick={passwordShowHide}></i>}</div>
                            </div>
                          </div>

                          <span style={{ color: 'red' }}>{error}</span>
                          <div className='button-box'>
                            <div className='login-toggle-btn'>
                              <Link
                                to={process.env.PUBLIC_URL + '/forgot-password'}
                              >
                                Forgot Password?
                              </Link>
                            </div>
                            <button style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#fff' }} type='submit'>
                              <span>Login</span>
                            </button>
                            {/* <button style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#fff' }} type='submit'>
                              <span>Verify Mobile</span>
                            </button> */}
                            <br /> <br />
                            <p>If you don't have an account, please <Link to="/register" style={{ color: 'rgb(0, 41, 95)', fontWeight: 'bold' }}>sign up</Link></p>
                          </div>
                        </form>
                      ) : (
                          <div>
                            {!isCode ? (
                              <form                                         autoComplete={'' + Math.random()}
                              onSubmit={handleMobileSubmit}>
                                <input
                                  type='text'
                                  name='user-mobile'
                                  required={true}
                                                                         autoComplete={'' + Math.random()}

                                  placeholder='User Mobile Number'
                                  onChange={handleMobileChange('mobileLoginId')}
                                  value={mobileLoginId}
                                />

                                <span style={{ color: 'red' }}>{error}</span>
                                <div className='button-box'>
                                  <button style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#fff' }} type='submit'>
                                    <span>Send OTP</span>
                                  </button>
                                </div>
                              </form>
                            ) : (<div>
                              <form                                         autoComplete={'' + Math.random()}
 onSubmit={handleOtpSubmit}>
                                <input
                                  type='text'
                                  name='user-mobile'
                                  required={true}
                                                                         autoComplete={'' + Math.random()}

                                  placeholder='User Mobile Number'
                                  onChange={handleOtpChange('otpLoginId')}
                                  value={phone}
                                />
                                <input
                                  type='text'
                                  name='user-code'
                                                                         autoComplete={'' + Math.random()}

                                  required={true}
                                  placeholder='otp'
                                  onChange={handleOtpChange('otpCode')}
                                  value={otpCode}
                                />


                                <span style={{ color: 'red' }}>{error}</span>
                                <div className='button-box'>
                                  <button style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#fff' }} type='submit'>
                                    <span>Veryfy OTP and Login</span>
                                  </button>
                                </div>
                              </form>

                              {timeCount ? (
                                <form                                         autoComplete={'' + Math.random()}
                                onSubmit={handleMobileSubmit} className="mt-4">
                                  <input
                                    type='hidden'
                                    name='user-mobile'
                                    required={true}
                                                                           autoComplete={'' + Math.random()}

                                    placeholder='User Mobile Number'
                                    onChange={handleMobileChange('mobileLoginId')}
                                    value={mobileLoginId}
                                  />

                                  <span style={{ color: 'red' }}>{error}</span>
                                  <div className='button-box'>
                                    <button style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#fff' }} type='submit'>
                                      <span>Resend OTP</span>
                                    </button>
                                  </div>
                                </form>
                              ) :
                                ""
                              }

                            </div>
                              )}

                          </div>
                        )}

                    </div>
                  </div>
                  {redirectUser()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
LoginRegister.propTypes = {
  location: PropTypes.object,
};
export default LoginRegister;
