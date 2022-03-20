import PropTypes from 'prop-types';
import React, { Fragment, useState ,useEffect} from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import MetaTags from 'react-meta-tags';
import config from '../../config';
import LayoutOne from '../../layouts/LayoutOne';
import './style.css';
import SuccessModal from "../../components/popup/SuccessModal";

const BrandFeedback = ({ location }) => {
  const { pathname } = location;
  const [profile, setProfile] = useState({
    firstName: '',
  });
  const [successOpen, setSuccessOpen]=useState(false);
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const openSuccess=()=>{
    setSuccessOpen(false)
    setProfile({
      firstName: '',
    
    })
  }
  const { firstName } = profile;
  const handleChange1 = (name) => (event) => {
    setProfile({ ...profile, error: false, [name]: event.target.value });
  };
  const onSubmit = async (event) => {
    event.preventDefault()
    var url = config.url + '/commonroutes/mail';

    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        To: ['rohancool3845@gmail.com'],
        subject: 'Brand Feedback',
        text: 'Brand Feedback',
        html: `
          <h1 style="color: #5b5b5b;">Note : ${firstName}</h1>  
          <h4 style="color: #757575;">Cheers!</h4>
          <h4 style="color: #757575;">Utsav Plasto Tech Team</h4>"
          `,
      }),
    })
      .then(() => {
        setSuccessOpen(true)
      })
      .catch((err) => console.log(err));
  };

 
  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Brand Feedback</title>
        <meta
          name='description'
          content='Utsav Plasto Tech | Brand Feedback'
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Careers
      </BreadcrumbsItem>
      <LayoutOne headerTop='visible'>
      {successOpen ? <SuccessModal onClick={openSuccess} message="Thank You! Your Info Recorded!" /> :null}
      <form onSubmit={onSubmit}>
        <div style={{ marginTop: '2%' }}>
          <div className="container">
            <div>
              <h1 style={{ fontFamily: 'serif' }}>Brand Feedback</h1>
            </div>
            <div>
              <h4>
                Drop a note and we will get back to you as quickly as possible:{' '}
                <span style={{ color: 'red' }}>*</span>
              </h4>
              <textarea
                type='text'
                name='FirstName'
                placeholder='Note'
                required
                style={{ marginTop: '20px', marginBottom: '20px' }}
                onChange={handleChange1('firstName')}
              />
            </div>

            <div
              className='submit'
              style={{ marginBottom: '15%', borderRadius: 6 }}>
              <button type="submit" className="feed-btn" style={{ backgroundColor: '#062a5a', color: 'white' }} >Submit</button>
            </div>
          </div>
        </div>
     </form>
      </LayoutOne>
    </Fragment>
  );
};

BrandFeedback.propTypes = {
  location: PropTypes.object,
};

export default BrandFeedback;
