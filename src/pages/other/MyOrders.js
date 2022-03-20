import PropTypes, { node } from 'prop-types';
import React, { Fragment, useEffect, useState,useReducer,useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import MetaTags from 'react-meta-tags';
import { useToasts } from 'react-toast-notifications';
import LayoutOne from '../../layouts/LayoutOne';
import { fetchApi } from '../../services/api';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';
import './style1.css';
import { signout } from '../../auth/index';

const MyOrders = ({ location }) => {
  const { addToast } = useToasts();

  const { pathname } = location;
  const myRefname = useRef(null);
  const [orders, setOrders] = useState([]);
  const[content,setcontent]=useState("")
  const [name, setName] = useState('');
  const handleClick = () => {
    // myRefname.current.focus();
    myRefname.current.dispatchEvent(
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      }),
    );
  }
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const [orderdetials, setOrderDeatils] = useState({
    orderId: '',
    type: '',
    trackStatus: '',
    total: '',
    totaltax: '',
    slug:'',
    totaldiscount: '',
    creditsUsed:'',
    grandTotal: '',
    couponDiscount: '',
    invoiceUrl: '',
    address: {
      fullname: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
    },
  });

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3 , setShow3] = useState(false);

  const handleclose3 = () => {setShow3(false)
  setShow2(false)}
  const handleshow3 = () => setShow3(true)


  const init = async () => {
    return fetchApi('/myorders/loadMyOrders', null, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.length > 0) {
          setOrders(response.data.reverse());
        } else {
          // addToast(response.data.message, {
          //   appearance: 'error',
          //   autoDismiss: true,
          // });
        }
      })
      .catch((err) => console.log('error ->', err));
  };

  const orderbyid = (orderId, trackStatus) => {
    if (trackStatus === 2) {
      handleShow2();
    } else {
      handleShow1();
    }

    let obj = {
      id: orderId,
    };
    return fetchApi('/myorders/myOrderById', obj, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.result !== null) {
          setOrderDeatils({
            orderId: response.data.result.orderId,
            type: response.data.result.paymentMode,
            trackStatus: response.data.result.trackStatus,
            total: response.data.result.total,
            totaltax: response.data.result.totaltax,
            totaldiscount: response.data.result.totaldiscount,
            grandTotal: response.data.result.grandTotal,
            creditsUsed:response.data.result.creditsUsed,
            couponDiscount: response.data.result.couponDiscount,
            products: response.data.result.products,
            deliveryCharges: response.data.result.deliveryCharges,
            invoiceUrl: response.data.result.invoiceUrl,
            address: {
              fullname: response.data.result.address.fullname,
              area: response.data.result.address.area,
              city: response.data.result.address.city,
              state: response.data.result.address.state,
              pincode: response.data.result.address.pincode,
              country: response.data.result.address.country,
            },
          });
        }
         else {
          addToast(response.data.message, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log('error ->', err));
  };

  const returnOrder = (orderId, productId, variantId) => {
    let obj = {
      orderId: orderId,
      productId: productId,
      variantId: variantId,
    };

    return fetchApi('/userdash/returnOrder', obj, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.message === 'success') {
          init();
          addToast('Return Request Successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        } else {
          addToast(response.data.message, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log('error ->', err));
  };

  const cancelorder = (orderId,productId,variantId,title) => {
    // handleshow3()
    var answer;

    
            let obj = {
              orderId: orderId,
              productId:productId,
              variantId:variantId,
              title:title,
              content:content
            };
            return fetchApi('/userdash/cancelOrder', obj, {}, true, 'post')
              .then((response) => {
                if (response.data.message === 'Access denied') {
                  addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                          
                   setTimeout(function(){  signout(() => { }) }, 2000);
                }
                if (response.data.message === 'success') {
                  init();
                  alert("Order Canceled Successfully")
                  addToast('Order Canceled Successfully', {
                    appearance: 'success',
                    autoDismiss: true,
                  });
                } else {
                  addToast(response.data.message, {
                    appearance: 'error',
                    autoDismiss: true,
                  });
                }
              })
  
  };

  useEffect(() => {
    init();
  }, []);

  const showDate = (data) => {
    var d = new Date(data);
    var date = d.getDate();
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    var month = d.getMonth(); // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
    var dateStr = date + " " + months[month] + " " + year;
    // var res =
    return dateStr;
  };
  

  
const Checkbox = ({ fnClick, fnChange, title = "", checked = false }) => (
  <label>
    <input
     style={{ width: "18px" ,marginTop:"-0.2em"}}
      onClick={e => {
        if (fnClick !== undefined) fnClick(e.target.checked);
      }}
      onChange={e => {
        if (fnChange !== undefined) fnChange(e.target.checked);
      }}
      type="checkbox"
      checked={checked}
    />
    {"     " + title}
  </label>
);

  const initialState = {
    click: false,
    change: false,
    first:false,
    second:false,
    third:false,
    fourth:false,
  };
  const reducer = (state, action) => ({ ...state, ...action });

  const [state, setState] = useReducer(reducer, initialState);
  const [questionfirst, setQuestionFirst] = useReducer(reducer , initialState)
  const clearFilter = () => setState(initialState);


  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | My Orders</title>
        <meta
          name='description'
          content='Utsav Plasto Tech My Orders'
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Orders
      </BreadcrumbsItem>
      <Modal show={show3} onHide={handleclose3}>
        <Modal.Header closeButton>
          <Modal.Title>Why do you wish to cancel your order?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div class="container">
              <div class="row">
              <div className=" ml-4">
                  {/* <button onClick={() => clearFilter()}>Clear </button> */}
                  {/* <br /> */}
                  <div class='row mt-1'>
                    <Checkbox
                   
                  
                    title=""
                    label=""
                    fnClick={v =>{ setState({ click: v,first:false,second:false,third:false,fourth:false,change:false})
                  setcontent("Order Created by Mistake")}}
                    checked={state.click}
                  />
                  <h4 className='mt-1 ml-4'>Order Created by Mistake</h4>
                  </div>
                  <div class='row mt-1'>
                    <Checkbox
                    // title="Click"
                    fnClick={v => {setState({ first: v,click:false,second:false,third:false,fourth:false,change:false })
                    setcontent("Found cheaper somewhere else")}}
                    checked={state.first}
                  />
                  <h4 className='mt-2 ml-4'>Found cheaper somewhere else</h4>
                  </div>
                  <div class='row mt-1'>
                    <Checkbox
                    // title="Click"
                    fnClick={v => {setState({ second: v,first:false,click:false,third:false,fourth:false,change:false })
                    setcontent("Need to change my billing address")
                  }}
                    checked={state.second}
                  />
                  <h4 className='mt-2 ml-4'>Need to change my billing address</h4>
                  </div>
                  <div class='row mt-1'>
                    <Checkbox
                    // title="Click"
                    fnClick={v => {setState({ third: v,first:false,second:false,click:false,fourth:false,change:false })
                  setcontent("Item price too high")
                  }}
                    checked={state.third}
                  />
                  <h4 className='mt-2 ml-4'> Item price too high</h4>
                  </div>
                  <div class='row mt-1'>
                    <Checkbox
                    // title="Click"
                    fnClick={v => {setState({ fourth: v,first:false,second:false,third:false,click:false,change:false })
                  setcontent("Need to order something else")
                  }}
                    checked={state.fourth}
                  />
                  <h4 className='mt-2 ml-4'>Need to order something else</h4>
                  </div>
                  <div class='row mt-1'>
                    <Checkbox
                    // title="Click"
                    fnClick={v => {setState({ change: v,first:false,second:false,third:false,fourth:false,click:false })
                  
                  setcontent("Others")}}
                    checked={state.change}
                    />
                  <h4 className='mt-2 ml-4'>Others</h4>
                  </div>
{/*                  
                  <br />
                  <Checkbox
                    title="Change"
                    fnChange={v => setState({ change: v })}
                    checked={state.change} */}
                  {/* /> */}
                  {/* <br />
                  click: {state.click ? "true" : "false"}
                  <br />
                  change: {state.change ? "true" : "false"} */}
                </div>
              </div>

            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: '#A6C239', color: '#fff' }} variant='secondary' onClick={()=>{
            if(content==="")
            {
              alert("Please select one")
              return 0
            }
            handleclose3()
            handleClose2()
            handleClick()
          }}>
            submit 
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1}>
      {/* <Modal> */}
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6 col-md-6'>
              <div className='billing-info'>
                <label>Order Id:</label>
                <strong className='ml-10'> {orderdetials.orderId}</strong>
              </div>
            </div>
            {/* <div className='col-lg-6 col-md-6'>
              <div className='billing-info'>
                <label>Track Status:</label>
                <strong className='ml-10'> {orderdetials.trackStatus}</strong>
              </div>
            </div> */}
            <div className='col-lg-6 col-md-6'>
              <div className='billing-info'>
                <label>Type:</label>
                <strong className='text-capitalize'>
                  {' '}
                  {orderdetials.type}
                </strong>
              </div>
            </div>
            <div className='col-lg-6 col-md-6'>
              <div className='billing-info'>
                <label>SubTotal:</label>
                <strong className='ml-10'>₹{!isNaN(orderdetials.total+orderdetials.totaldiscount+orderdetials.creditsUsed)?(orderdetials.total+orderdetials.totaldiscount+orderdetials.creditsUsed):parseFloat(orderdetials.total+orderdetials.totaldiscount+orderdetials.creditsUsed).toFixed(2)}</strong>
              </div>
            </div>
            <div className='col-lg-6 col-md-6'>
              <div className='billing-info'>
                <label>GrandTotal:</label>
                <strong className='ml-10'>₹{!isNaN(orderdetials.grandTotal)?(orderdetials.grandTotal):parseFloat(orderdetials.grandTotal).toFixed(2)}</strong>
              </div>
            </div>
        
            <div className='col-lg-6 col-md-6'>
              <div className='billing-info'>
                {/* <label>Total Discount:</label>
                <strong className='ml-10'>
                  ₹{orderdetials.creditsUsed > 0||orderdetials.totaldiscount>0 ? parseFloat(orderdetials.totaldiscount+orderdetials.creditsUsed).toFixed(2) : 0}
                </strong>
                <div> <label>credits</label><strong className='ml-10'>
                  ₹{orderdetials.creditsUsed > 0 ? parseFloat(orderdetials.creditsUsed).toFixed(2) : 0}
                </strong></div> */}
                <div><label>Discount</label> <strong className='ml-10'>
                  
                  ₹{orderdetials.totaldiscount > 0 ?parseFloat( orderdetials.totaldiscount).toFixed(2) : 0}
                </strong></div>
              </div>
            </div>
            <div className='col-lg-6 col-md-6'>
              <div className='billing-info'>
                <label>Total tax:</label>
                <strong className='ml-10'>
                  ₹{orderdetials.totaltax > 0 ? parseFloat(orderdetials.totaltax).toFixed(2) : 0}
                </strong>
              </div>
            </div>
            <div className='col-lg-6 col-md-6'>
              <div className='billing-info'>
                <label>Delivery Charges:</label>
                <strong className='ml-10'>
                  ₹{orderdetials.deliveryCharges}
                </strong>
              </div>
            </div>
            <div className='col-lg-6 col-md-6'>

<div className='billing-info'>
                <label>Order Status</label>
                <strong className='ml-10 text-capitalize'>
                  {orderdetials.trackStatus}
                </strong>
              </div>
            
              {/* -----------download invoice------------- */}
          {orderdetials.trackStatus==="delivered"?(<div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 10,
                  marginLeft:-10,
                }}
              >
                <p style={{ color: '#0000FF' }}>
                  <a href={`https://api.utsavplastotech.com${orderdetials.invoiceUrl}`}
                    target="_blanck"
                    style={{ width: 180 }}
                    className='btn btnColor'
                  >
                    Download Invoice{' '}
                  </a>
                </p>
              </div>):null}    
              {/* ----------------------- */}

            </div>
          </div>
          <div className='cart-main-area pt-90 pb-100'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-12 col-md-12'>
                  <div className='table-content table-responsive cart-table-content'>
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Variant </th>
                          <th>Value</th>
                          <th>Mrp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderdetials.products &&
                          orderdetials.products.map((p, i) => (
                            <tr key={i}>
                              <td className='product-thumbnail'>
                                <strong>
                                <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        p.slug
                                      }
                                    >
                                  {p.imageUrl !== undefined ? (
                                    <img
                                    style={{height:"71px",
                                    objectFit:"contain"}}
                                      src={`https://api.utsavplastotech.com${p.imageUrl}`}
                                      alt='product img'
                                      className='img-fluid'
                                    />
                                  ) : (
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          '/assets/img/externalimages/no-image-available.jpg'
                                        }
                                        alt='false-image'
                                        className='default-img'
                                      />
                                    )}
                                    </Link>
                                </strong>
                              </td>
                              <td className='product-name'>
                                <strong>
                                <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        p.slug
                                      }
                                    >{p.title}
                                    </Link></strong>
                              </td>

                              <td className='product-name'>
                                <strong>₹{!isNaN(p.price)?(p.price):parseFloat(p.price).toFixed(2)}</strong>
                              </td>

                              <td className='product-name'>
                                <strong>{p.quantity}</strong>
                              </td>

                              <td className='product-name'>
                               <div> <strong>{p.variant1.name}</strong></div>
                                <strong>{p.variant2!==undefined?p.variant2.name:""}</strong>
                              </td>

                              <td className='product-name'>
                               <div><strong>{p.variant1.value}</strong></div> 
                                <strong>{p.variant2!==undefined?p.variant2.value:""}</strong>
                              </td>
                              {/* <td className='product-name'>
                                <strong>{p.variant2.name}</strong>
                              </td>

                              <td className='product-name'>
                                <strong>{p.variant2.value}</strong>
                              </td> */}

                              <td className='product-name'>
                                <strong>₹{!isNaN(p.mrp)?(p.mrp):parseFloat(p.mrp).toFixed(2)}</strong>
                              </td>

                           
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal style={{display:show3===true?"none":""}} show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Return Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='cart-main-area pt-90 pb-100'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-12 col-md-12'>
                  <div className='table-content table-responsive cart-table-content'>
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Return Action</th>
                          <th>Cancel Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderdetials.products &&
                          orderdetials.products.map((p, i) => (
                            <tr  key={i}>
                              <td className='product-thumbnail'>
                                <strong>
                                  {p.imageUrl !== undefined ? (
                                    <img
                                      src={`https://api.utsavplastotech.com${p.imageUrl}`}
                                      alt='product img'
                                      className='img-fluid'
                                    />
                                  ) : (
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          '/assets/img/externalimages/no-image-available.jpg'
                                        }
                                        alt='false-image'
                                        className='default-img'
                                      />
                                    )}
                                </strong>
                              </td>
                              <td className='product-name'>
                                <strong>{p.title}</strong>
                              </td>

                              <td className='product-name'>
                                <strong>₹{!isNaN(p.price)?(p.price):parseFloat(p.price).toFixed(2)}</strong>
                              </td>

                              <td className='product-name'>
                                <strong
                                  style={{
                                    display:
                                      p.returnStatus === 'pending' ||
                                        p.returnStatus === 'cancelled' ||
                                        p.returnStatus === 'success' ||
                                        p.returnStatus === 'approved'
                                        ? 'flex'
                                        : 'none',
                                  }}
                                >
                                  {p.returnStatus}
                                </strong>
                                <button
                                  style={{
                                    display:
                                      p.trackStatus === 'received' 
                                        ? 'flex'
                                        : 'none',
                                  }}
                                  className='btn btn-primary'
                                  onClick={() =>
                                    returnOrder(
                                      orderdetials.orderId,
                                      p.productId,
                                      p.variantId,
                                    )
                                  }
                                >
                                  Return
                                </button>
                              </td>
                              <td>
                              <button
                              ref={myRefname}
                                  style={{
                                    display:
                                      p.trackStatus === 'ordered' 
                                        ? 'none'
                                        : 'none',
                                  }}
                                  className='btn btn-primary'
                                  onClick={() =>
                                    cancelorder(
                                      orderdetials.orderId,
                                      p.productId,
                                      p.variantId,
                                      p.title
                                    )
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  style={{
                                    display:
                                      p.trackStatus === 'ordered' 
                                        ? 'flex'
                                        : 'none',
                                  }}
                                  className='btn btnColor'
                                  onClick={() =>
                                 {
                                  //  handleClose2()
                                    handleshow3()
                                }
                                  }
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />

        <div className='myaccount-area pb-80 pt-100'>

          <div className='container'>
            <div className='row'>
              <div className='ml-auto mr-auto col-lg-9'>
                <h5 className='p-2'> {orders.length} Order placed</h5>
                <div className='myaccount-wrapper'>
                  <ul className='list-group'>
                    {orders.length > 0 ? (
                      orders.map((o, i) => (
                        <li key={o._id}>
                          <Accordion defaultActiveKey='0'>
                            <Card className='single-my-account mb-20'>
                              <Card.Header className='panel-heading'>
                                <Accordion.Toggle variant='link' eventKey='0'>
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          marginTop: 5,
                                        }}
                                      >
                                        <h5 style={{ marginLeft: 5, width:120 }}>
                                          Order placed On
                                        </h5>
                                        <h5 style={{ marginLeft: 10 }}>
                                          {showDate(o.orderedDate)}
                                        </h5>
                                      </div>
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}
                                      >
                                        <h5 style={{ marginLeft: 10 }}>
                                          Total
                                        </h5>
                                        <h5 style={{ marginLeft: 10 }}>
                                          ₹{o.grandTotal}
                                        </h5>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginTop: 5,
                                        marginRight: 20,
                                        paddingLeft: 10
                                      }}
                                    >

                                    <h5 style={{ marginLeft: 10 }}>
                                    Order Id :
                                        </h5>
                                        <h5>
                                        {o.orderId}
                                        </h5>

                                     
                                    </div>
                                  </div>
                                </Accordion.Toggle>
                              </Card.Header>
                              <Accordion.Collapse eventKey='0'>
                                <>
                                  <div className='cart-main-area pt-20 pb-20'>
                                    <div className='container'>
                                      <div className='row'>
                                        <div className='col-lg-9 col-md-9'>
                                          <div className='table-content table-responsive cart-table-content'>
                                            <table>
                                              <thead>
                                                <tr>
                                                  <th style={{ width: "280px" }}>Image</th>
                                                  <th style={{ width: "300px" }}>Title</th>
                                                  <th style={{ width: "250px" }}> {"  "}      Price</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {o.products.map((p, i) => (
                                                  <tr>
                                                    <td className='product-thumbnail'>
                                                      <strong>
                                                      <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        p.slug
                                      }
                                    >
                                                        {p.imageUrl !==
                                                          undefined ? (
                                                            <img
                                                            style={{height:"71px",
                                                            objectFit:"contain"}}
                                                              src={`https://api.utsavplastotech.com${p.imageUrl}`}
                                                              alt='product img'
                                                              className='img-fluid'
                                                            />
                                                          ) : null}
                                                          </Link>
                                                      </strong>
                                                    </td>

                                                    <td className='text-left text-capitalize'>
                                                      <strong>
                                                      <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        p.slug
                                      }
                                    >{p.title}
                                    </Link></strong>
                                                    </td>
                                                    <td   className='product-name'>
                                                      <strong>
                                                        ₹{p.price.toFixed(2)}
                                                      </strong>
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                        <div className='col-lg-3 col-md-3'>
                                          <div
                                            style={{
                                              display:
                                                o.trackStatus === 'ggg'
                                                  ? 'flex'
                                                  : 'none',
                                              flexDirection: 'row',
                                            }}
                                          >
                                            <p style={{ color: '#A6C239' }}>
                                              <button
                                                style={{ width: 180, backgroundColor: '#A6C239',display:"none" }}
                                                className='btn btn-primary'
                                                onClick={() =>
                                                  cancelorder(o.orderId)
                                                }
                                              >
                                                Cancel Order{' '}
                                              </button>
                                              <button
                                                style={{ width: 180, backgroundColor: '#A6C239',display:"none" }}
                                                className='btn btn-primary'
                                                onClick={() =>
                                                 handleshow3()
                                                }
                                              >
                                                Cancel Order{' '}
                                              </button>
                                            </p>
                                          </div>

                                <div className="orderButton">

                                          <button
                                            className='btn btnColor'
                                            onClick={() =>
                                              orderbyid(o.orderId, 1)
                                            }
                                          >
                                            Order Details
                                          </button>
                                        


<button
  className='btn btnColor'
 
>
 Status: {o.trackStatus}
</button>

                                         

                          </div>



                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </li>
                      ))
                    ) : (
                        <div>
                          <button className='cart-btn-button mt-10'>
                            No Orders are there
                        </button>
                        </div>
                      )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyOrders.propTypes = {
  location: PropTypes.object,
};

export default MyOrders;
