import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import { fetchApi } from "../../services/api";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {

  useEffect(() => {
    init1();
  }, [])

  const [state, setstate] = useState('')

  const init1 = async () => {
    return fetchApi('/cms/getcms', { "cmsid": "aboutus" }, {}, true, 'post')
      .then((response) => {
        if (response.data.html) {
          setstate(response.data.html);
        }
      })
      .catch((err) => console.log('error ->', err));
  };

  return (

    <div>
      {
        state === '' ? (null

        ) : (<div className="contact-area pt-100 pb-100">
          {ReactHtmlParser(state)}
        </div>)
      }




    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
