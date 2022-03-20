import PropTypes from "prop-types";
import React, { useState } from "react";
// import ModalVideo from "react-modal-video";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player'

const VideoPopup = ({ spaceBottomClass }) => {
  const [ isOpen] = useState(false);
  return (
    <>
    <div className={`video-popup ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="video-popup__image">
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/img/banner/74.jpg"
                }
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="video-popup__content">
              <h3 className="bold title">
              Utsav Plasto Tech is a premium cosmetics brand
              </h3>
              <p className="text mb-30">
              We believe that true beauty lies in creating a harmonious balance between nature and science. Our products are cruelty free. Our mission is to find beauty secrets that create a perfect balance between humans and science. We believe that herbal products are a much safer alternative to synthetic cosmetics as natural ingredients nurture our well-being without causing any damage. A brand which develops products from world-class research and attempts to solve every little problem that we face.
              </p>
              <div className="link mb-30">
                <Link to={process.env.PUBLIC_URL + "/about"}>
                  More About Us
                </Link>
              </div>
              {/* <ModalVideo
                channel="youtube"
                isOpen={modalStatus}
                videoId="j-oK8i0GX3I"
                onClose={() => isOpen(false)}
              /> */}
              <button >
                <i className="fa fa-play-circle" style={{ color: "#F6428B" }}></i>
              </button>
              {/* <button>
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <i className="fa fa-play-circle" style={{ color: "#F6428B" }}></i>
                </Link>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
 
 <div style={{paddingBottom:"100px"}}>
 <ReactPlayer loop={true} controls={true} playing={true}   width='100%'
          height='70vh' url='/assets/SEHERBAL.mp4' />

 </div>
 </>
  );
};

VideoPopup.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default VideoPopup;
