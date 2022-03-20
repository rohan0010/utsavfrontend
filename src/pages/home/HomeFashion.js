import React, { Fragment,useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderEight from "../../wrappers/hero-slider/HeroSliderEight";
import FeatureIconSix from "../../wrappers/feature-icon/FeatureIconSix";
// import VideoPopup from "../../components/video-popup/VideoPopup";
import BannerOne from "../../wrappers/banner/BannerOne";

import { Link } from 'react-router-dom';
import { searchglobalproduct } from '../../redux/actions/productActions';
import { useToasts } from 'react-toast-notifications';
import { useDispatch } from 'react-redux';

import BannerThirty from "../../wrappers/banner/BannerThirty";
import ProductSliderThree from "../../wrappers/product/ProductSliderThree";
import ProductSliderFour from "../../wrappers/product/ProductSliderFour";
import '../../wrappers/hero-slider/style.css';
// import '../../assets/scss/_slider.scss'
const HomeFashion = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  useEffect(() => {
    // document.oncontextmenu = function (e) {
    //   if (e.button == 2) {
    //     e.preventDefault();
    //     return false;
    //   }

    // }
  }, [])
  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech</title>
        <meta
          name="description"
          content="Fashion home of Utsav Plasto Tech."
        />
      </MetaTags>
      <LayoutOne
        headerTop="visible"
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* ---- */}

        {/* hero slider */}
        <HeroSliderEight spaceLeftClass="ml-70" spaceRightClass="mr-70" />
        {/* banner */}
        <BannerOne spaceTopClass="pt-60" spaceBottomClass="pb-65" />
        {/* { window.innerWidth<= 760? ( <div >
                <center>
                  <Link
                    // className='animated btnhover'
                    to={process.env.PUBLIC_URL + '/shop?page=1'}
                  >
                    <button style={{background:"#00295F"}}
                      onClick={() =>
                        dispatch(searchglobalproduct(null, 1, addToast))
                      }
                    >
                      <span style={{color:"#fff"}}>SHOP NOW</span>
                  </button>
                  </Link>
                </center>

              </div>):null} */}
        {/* featured icon */}
        {/* <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" /> */}
        {/* <FeatureIconSix spaceTopClass="pt-30" spaceBottomClass="pb-30" /> */}

        {/* video popup */}
        {/* <VideoPopup spaceBottomClass="pb-100" /> */}

        {/* tab product */}
        {/* <TabProduct spaceBottomClass="pb-60" category="fashion" /> */}

        {/* product slider */}
        {/* <ProductSliderFour category="fashion" spaceTopClass="pt-100" /> */}

        {/* banner */}
        {/* <BannerThirty spaceTopClass="pt-100" spaceBottomClass="pb-70" /> */}

        {/* product slider */}
        {/* <ProductSliderThree category="fashion" /> */}

        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
