import PropTypes from 'prop-types';
import React, { Fragment, useState,useEffect } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import MetaTags from 'react-meta-tags';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import './style.css';
import S3 from 'react-aws-s3';
import { Button } from 'react-bootstrap';
import SuccessModal from "../../components/popup/SuccessModal";

const Employment = ({ location }) => {
  const config = {
    bucketName: 'file-bucket-222',
    dirName: 'media', /* optional */
    region: 'ap-south-1',
    accessKeyId: 'AKIAJEQX3WOTEYMUCHZA',
    secretAccessKey: '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',

  }
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const { pathname } = location;
  const ReactS3Client = new S3(config);
  const [successOpen, setSuccessOpen]=useState(false);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    resume: '',
    coverletter: '',
  });
  const { firstName, lastName, mobile, email, resume, coverletter } = profile;
  const [dis, setDis] = useState(true);
  const [mobError, setMobError] = useState('')
  const handleChange1 = (name) => (event) => {
    if (name === 'mobile') {
      if (event.target.value.length <= 20) {
        setProfile({ ...profile, error: false, [name]: event.target.value });
      }
    }
    else {
      setProfile({ ...profile, error: false, [name]: event.target.value });

    }
    if (profile.mobile.length === 9) {
      setDis(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (mobile.length === 10) {
      var url = "https://api.utsavplastotech.com/commonroutes/mail";

      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          To: ['rjha07188@gmail.com'],
          subject: 'New Career',
          text: 'New',
          html: `
          <h1 style="color: #5b5b5b;">First Name : ${firstName}</h1>
          <h1 style="color: #5b5b5b;">Last Name : ${lastName}</h1>
          <h3 style="color: #757575;">Email: ${email}</h3>
          <h3 style="color: #757575;">Mobile Number: ${mobile}</h3>
          <h3 style="color: #757575;">Resume:<a href=${resume}> ${resume}</a></h3>
          <h3 style="color: #757575;">Cover Letter: <a href=${coverletter}>${coverletter}</a></h3>
        
       
        
          
          
          <h4 style="color: #757575;">Cheers!</h4>
          <h4 style="color: #757575;">Utsav Plasto Tech Team</h4>"
          `,
        }),
      })
        .then(() => {

          alert('Thank You! Your application has been submitted successfully');
        })
        .catch((err) => console.log(err));
    } else {
      setMobError("Mobile Number Should be 10 digits")
    }
  };

  const Upload_To_AWS_S3 = (e) => {
    ReactS3Client
      .uploadFile(e.target.files[0])
      .then(data => { setProfile({ ...profile, resume: data.location }) })
      .catch(err => console.error(err))
  };
  const openSuccess=()=>{
    setSuccessOpen(false)
    setProfile({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      resume: '',
      coverletter: '',
    
    })
  }
  const Upload_To_AWS_S31 = (e) => {

    ReactS3Client
      .uploadFile(e.target.files[0])
      .then(data => { setProfile({ ...profile, coverletter: data.location }) })
      .catch(err => console.error(err))

  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }
  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Employment</title>
        <meta
          name='description'
          content='Utsav Plasto Tech | Employment'
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Careers
      </BreadcrumbsItem>
      {successOpen ? <SuccessModal onClick={openSuccess} message="Thank You! Your Info Recorded!" /> :null}

      <LayoutOne headerTop='visible'>
        <Breadcrumb />
        <form onSubmit={handleSubmit}>
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
                          name='FirstName'
                          placeholder='First Name'
                          required={true}
                          onChange={handleChange1('firstName')}
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
                          name='category'
                          placeholder='Last Name'
                          required={true}
                          onChange={handleChange1('lastName')}
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
                          name='category'
                          placeholder='Email'
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
                          Attach Resume: <span style={{ color: 'red' }}>*</span>
                        </h4>
                      </td>
                      <td classNAme="contact-value">

                        <div class="button-wrap">
                          <label class="new-button" for="upload"> Upload Resume</label>
                          <input
                            id="upload"
                            type="file"
                            required={true}
                            name='image'
                            onChange={(e) => {
                              Upload_To_AWS_S3(e);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="contact-name">
                        <h4>
                          Attach Cover Letter:{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </h4>
                      </td>
                      <td classNAme="contact-value">

                        <div class="button-wrap">
                          <label class="new-button" for="upload2"> Upload Cover Letter</label>
                          <input
                            id="upload2"
                            type="file"
                            name='image2'
                            required={true}
                            onChange={(e) => {
                              Upload_To_AWS_S31(e);
                            }}
                          />
                        </div>
                      </td>
                    </tr>


                    <tr>
                      <td className="contact-name px-3" colspan="2">
                        <Button
                          className='cart-btn-button float-left mt-10 '
                          style={{ backgroundColor: '#00295F', color: '#fff', borderRadius: 0 }}
                          type='submit'
                          // onClick={() => handleSubmit()}
                          // disabled={dis}
                        >
                          <span>SUBMIT</span>
                        </Button>
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

Employment.propTypes = {
  location: PropTypes.object,
};

export default Employment;
