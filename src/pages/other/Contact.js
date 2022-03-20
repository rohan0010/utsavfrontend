import PropTypes from 'prop-types';
import React, { Fragment, useState,useEffect } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import MetaTags from 'react-meta-tags';
import config from '../../config';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { Button } from 'react-bootstrap';
import SuccessModal from "../../components/popup/SuccessModal";

const Contact = ({ location }) => {
  const { pathname } = location;
  const [successOpen, setSuccessOpen]=useState(false);
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    subject: '',
    orderno: '',
    description: ' ',
  });
  const {
    firstName,
    lastName,
    mobile,
    email,
    orderno,
    description,
  } = contact;
  const [dis, setDis] = useState(true);
  const [mobError, setMobError] = useState('')
  const handleChange1 = (name) => (event) => {
    if (name === 'mobile') {
      if (event.target.value.length <= 20) {
        setContact({ ...contact, error: false, [name]: event.target.value });
      }
    }
    else {
      setContact({ ...contact, error: false, [name]: event.target.value });

    }
    if (contact.mobile.length === 9) {
      setDis(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (mobile.length === 10) {
      var url = config.url + '/commonroutes/mail';

      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          To: ['rohancool3845@gmail.com'],
          subject: 'New Query',
          text: 'New',
          html: `
            <h1 style="color: #5b5b5b;">First Name : ${firstName}</h1>
            <h1 style="color: #5b5b5b;">Last Name : ${lastName}</h1>
            <h3 style="color: #757575;">Email: ${email}</h3>
            <h3 style="color: #757575;">Mobile Number: ${mobile}</h3>
            <h3 style="color: #757575;">Order Id and subject: ${orderno}</h3>
            <h3 style="color: #757575;">Description: ${description}</h3>
            
          
            
            <h4 style="color: #757575;">Cheers!</h4>
            <h4 style="color: #757575;">Utsav Plasto Tech Team</h4>"
            `,
        }),
      })
        .then(() => {

          setSuccessOpen(true)
        })
        .catch((err) => console.log(err));

    } else {
      setMobError("Mobile Number Should be 10 digits")
    }

  };

  


  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  const openSuccess=()=>{
    setSuccessOpen(false)
    setContact({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      subject: '',
      orderno: '',
      description: ' ',
    })
  }
  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Contact Us</title>
        <meta
          name='description'
          content='Utsav Plasto Tech | Contact Us'
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Contact Us
      </BreadcrumbsItem>
      {successOpen ? <SuccessModal onClick={openSuccess} message="Thank You! Your Info Recorded!" /> :null}

      <LayoutOne headerTop='visible'>
        <Breadcrumb />
        <form autoComplete={'' + Math.random()} onSubmit={handleSubmit}>
        <div className='login-register-area pt-100 pb-100'>
          <div className='container'>
            <div className="row">
              <div className="col-lg-10 col-md-10 col-sm-12 col-12 m-auto">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="contact-name">
                        <h4>
                          First Name <span style={{ color: 'red' }}>*</span>
                        </h4>
                      </td>
                      <td classNAme="contact-value">
                        <input
                          type='text'
                          autoComplete={'' + Math.random()}
                          name='FirstName'
                          placeholder='First Name'
                          value={firstName}
                          onChange={handleChange1('firstName')}
                          required={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="contact-name">
                        <h4>
                          Last Name <span style={{ color: 'red' }}>*</span>
                        </h4>
                      </td>
                      <td classNAme="contact-value">
                        <input
                          type='text'
                          autoComplete={'' + Math.random()}
                          name='category'
                          placeholder='Last Name'
                          value={lastName}
                          onChange={handleChange1('lastName')}
                          required={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="contact-name">
                        <h4>
                          Email <span style={{ color: 'red' }}>*</span>
                        </h4>
                      </td>
                      <td classNAme="contact-value">
                        <input
                          type="text"
                          pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                           title="Please Enter Valid Email"  
                          autoComplete={'' + Math.random()}
                          name='category'
                          placeholder='Email'
                          value={email}
                          onChange={handleChange1('email')}
                          required={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="contact-name">
                        <h4>
                          Phone Number <span style={{ color: 'red' }}>*</span>
                        </h4>
                      </td>
                      <td classNAme="contact-value">
                        <input
                          name="phoneNumber" 
                          id="phoneNumber" 
                          title="Please use a 10 digit telephone number with no dashes or dots" 
                          pattern="[0-9]{10}"  
                          maxLength={10} minLength={10}  
                          required={true}  type="tel" 
                          
                          autoComplete={'' + Math.random()}
                          placeholder='Phone Number'
                          value={mobile}
                          onChange={handleChange1('mobile')}
                        
                          onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
                          onInput={maxLengthCheck}
                          required={true}

                        />
                        <span style={{ color: '#F43128' }}>{mobError}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="contact-name">
                        <h4>
                          Order no and Subject{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </h4>
                      </td>
                      <td classNAme="contact-value">

                        <input
                          type='text'
                          name='category'
                          autoComplete={'' + Math.random()}
                          value={orderno}
                          placeholder='Order Number/Id'
                          onChange={handleChange1('orderno')}
                          required={true}
                        />
                        <br />
                        <p>Please include your order number (if applicable) and one of the following subjects: <br />
                        Order Change | Order Issue | Order Status | Return | Other
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="contact-name">
                        <h4>
                          Description <span style={{ color: 'red' }}>*</span>
                        </h4>
                      </td>
                      <td classNAme="contact-value">
                        <input
                          type='text'
                          name='category'
                          autoComplete={'' + Math.random()}
                          value={description}
                          placeholder='Description'
                          onChange={handleChange1('description')}
                          required={true}
                        />
                      </td>
                    </tr>


                    <tr>
                      <td className="contact-name px-3" colspan="2">
                        <Button
                          className='cart-btn-button w-100 mt-10 '
                          style={{ backgroundColor: '#00295F', color: '#fff', borderRadius: 0 }}
                          type='submit'
                          // onClick={() => handleSubmit()}
                          // disabled={dis}
                        >
                          <span>SUBMIT</span>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center px-3" colspan="2">
                        <b style={{ fontSize: 20 }}>Contact us</b> <br />
                        <p>+919773601129</p>
                        <p><b>Address: <br /></b> UTSAV PLASTO TECH<br />  Plot No,119 Pocket-A, Ecotech-6 Gautam Budh Nagar (U.P)

K-149, Site-V,UPSIDC,Kasna, Greater Noida uttar pradesh 201308,India </p>
                        <b>Email: <h4 style={{ color: '#062A5A' }}> <a href='https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=utsavplastotech@gmail.com' target='_blank' rel='noopener noreferrer'><u>utsavplastotech@gmail.com</u></a></h4></b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    
    </form>
      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object,
};

export default Contact;
