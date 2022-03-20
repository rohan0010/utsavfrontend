import PropTypes from 'prop-types';
import React, { Fragment,useEffect } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';

const Wholesale = ({ location }) => {
    const { pathname } = location;
    useEffect(() => {
        document.oncontextmenu = function (e) {
          if (e.button == 2) {
            e.preventDefault();
            return false;
          }
    
        }
      }, [])
    return (
        <Fragment>
            <MetaTags>
                <title>Utsav Plasto Tech | Wholesale </title>
                <meta
                    name='description'
                    content='Utsav Plasto Tech | Wholesale'
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Wholesale
      </BreadcrumbsItem>
            <LayoutOne headerTop='visible'>
                {/* breadcrumb */}
                <Breadcrumb />
                <div className='contact-area pt-100 pb-100'>
                    <div className='container'>
                        <div className='welcome-content text-center'>
                            <h1>wholesale
</h1>
                            <p className='text-justify'>
                                <b>I'm interested in offering Utsav Plasto Tech products in my boutique, do you have a wholesale program?</b> <br />
                                We do!  Please visit our <Link to={process.env.PUBLIC_URL + '/contact'}><u><b>bulk query</b> </u></Link> page to apply for a wholesale account.
                            </p>


                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

Wholesale.propTypes = {
    location: PropTypes.object,
};

export default Wholesale;
