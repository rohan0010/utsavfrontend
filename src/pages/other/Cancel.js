/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import MetaTags from 'react-meta-tags';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import './style.css';
import { Link } from 'react-router-dom';

const Cancel = ({ location }) => {
  const { pathname } = location;
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  useEffect(() => {
    var order = localStorage.getItem('order');
    if(order!==null&&JSON.parse(order).orderType==="order")
    {
    setShow1(true);
    }
    if(order!==null&&JSON.parse(order).orderType==="buynow")
    {
    setShow2(true);
    }
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Cancel</title>
        <meta
          name='description'
          content='Utsav Plasto Tech | Cancel'
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>

      <Modal
        show={show1}
        onHide={handleClose1}
        size='sm'
        centred
        backdrop="static"
        className='modal-custom-style'
      >
        <Modal.Header>
          <Modal.Title>Payment unprocessed, please try again later!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modal-style'>
            <i class='fa fa-times'></i>
          </div>
          <br />
          <Link to="/cart">
            <center><button onClick={()=>{localStorage.removeItem("order")
          localStorage.removeItem("transaction")}} style={{ backgroundColor: '#00295F', border: '1px solid #00295F', color: '#FFFFFF', padding: '5px 10px' }}>Ok, Go Back</button></center>
          </Link>

        </Modal.Body>
      </Modal>
      <Modal
        show={show2}
        onHide={handleClose2}
        size='sm'
        centred
        backdrop="static"
        className='modal-custom-style'
      >
        <Modal.Header>
          <Modal.Title>Payment unprocessed, please try again later!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modal-style'>
            <i class='fa fa-times'></i>
          </div>
          <br />
          <Link to="/buynow">
            <center><button onClick={()=>{localStorage.removeItem("order")
          localStorage.removeItem("transaction")}} style={{ backgroundColor: '#00295F', border: '1px solid #00295F', color: '#FFFFFF', padding: '5px 10px' }}>Ok, Go Back</button></center>
          </Link>

        </Modal.Body>
      </Modal>
      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
      </LayoutOne>
    </Fragment>
  );
};

Cancel.propTypes = {
  location: PropTypes.object,
};

export default Cancel;
