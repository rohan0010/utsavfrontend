import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { fetchApi } from "../../services/api";
import ReactHtmlParser from 'react-html-parser';

const Contact = ({ location }) => {
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
    return fetchApi('/cms/getcms', { "cmsid": "tnc" }, {}, true, 'post')
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
        <title>Utsav Plasto Tech | T&C </title>
        <meta
          name='description'
          content='Utsav Plasto Tech | Term and Condition'
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Terms and Conditions
      </BreadcrumbsItem>
      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
        {state === '' ? (null) : (<div className="contact-area pt-100 pb-100">
          {ReactHtmlParser(state)}
        </div>)}

      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object,
};

export default Contact;
