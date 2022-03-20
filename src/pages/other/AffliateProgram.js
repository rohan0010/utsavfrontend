import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { fetchApi } from "../../services/api";
import ReactHtmlParser from 'react-html-parser';
const AffliateProgram = ({ location }) => {
  const { pathname } = location;
  const [state, setstate] = useState('')
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  useEffect(() => {
    init1();
  }, [])
  const init1 = async () => {
    return fetchApi('/cms/getcms', { "cmsid": "affliateprogram" }, {}, true, 'post')
      .then((response) => {
        if (response.data.html) {
          setstate(response.data.html);
        }
      })
      .catch((err) => console.log('error ->', err));
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Affliate </title>
        <meta
          name='description'
          content='Utsav Plasto Tech | Affliate'
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Affliate Program
      </BreadcrumbsItem>
      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
        {state === '' ? (<div className='contact-area pt-10 pb-100'>
          <div className='container'>
            <div className='welcome-content text-center'>
              <h1>Affliate Program</h1>
              <h4>How do I become an affiliate?</h4>
              <p className='text-justify'>
                To be considered for our affiliate program, please apply to our
                program and we will be in touch.
              </p>
            </div>
          </div>
        </div>) : (<div className="contact-area pt-100 pb-100">
          {ReactHtmlParser(state)}

        </div>)}

      </LayoutOne>
    </Fragment>
  );
};

AffliateProgram.propTypes = {
  location: PropTypes.object,
};

export default AffliateProgram;
