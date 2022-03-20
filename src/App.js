import PropTypes from 'prop-types';
import React, { useEffect, Suspense, lazy } from 'react';
import ScrollToTop from './helpers/scroll-top';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { multilanguage, loadLanguages } from 'redux-multilanguage';
import { connect } from 'react-redux';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import Cancel from './pages/other/Cancel';
import Policy from './pages/other/Policy';
import { useDispatch, useSelector } from 'react-redux';
import{fetchbanner} from '../src/redux/actions/bannerActions'
import Wholesale from './pages/other/Wholesale';
import Privacy from './pages/other/Privacy';
import Checkout2 from './pages/other/Checkout2';
// home pages
const HomeFashion = lazy(() => import('./pages/home/HomeFashion'));

// shop pages
const ShopGridStandard = lazy(() => import('./pages/shop/ShopGridStandard'));
const ShopGridStandard1 = lazy(() => import('./pages/shop/ShopGridStandard1'));

// product pages
const Product = lazy(() => import('./pages/shop-product/Product'));
const ProductTabLeft = lazy(() =>
  import('./pages/shop-product/ProductTabLeft')
);
const ProductTabRight = lazy(() =>
  import('./pages/shop-product/ProductTabRight')
);
const ProductSticky = lazy(() => import('./pages/shop-product/ProductSticky'));
const ProductSlider = lazy(() => import('./pages/shop-product/ProductSlider'));
const ProductFixedImage = lazy(() =>
  import('./pages/shop-product/ProductFixedImage')
);

// other pages
const About = lazy(() => import('./pages/other/About'));
const Employment = lazy(() => import('./pages/other/Employment'));
const BrandFeedback = lazy(() => import('./pages/other/BrandFeedback'));
const BuyNow = lazy(() => import('./pages/other/BuyNow'));

const Contact = lazy(() => import('./pages/other/Contact'));
const CustomerCare = lazy(() => import('./pages/other/CustomerCare'));
const Faq = lazy(() => import('./pages/other/Faq'));
const Return = lazy(() => import('./pages/other/Return'));
const TermsandConditions = lazy(() =>
  import('./pages/other/TermsandConditions')
);

const Shipping = lazy(() => import('./pages/other/Shipping'));
const AffliateProgram = lazy(() => import('./pages/other/AffliateProgram'));

const MyAccount = lazy(() => import('./pages/other/MyAccount'));
const MyOrders = lazy(() => import('./pages/other/MyOrders'));

const LoginRegister = lazy(() => import('./pages/other/LoginRegister'));
const LoginRegister1 = lazy(() => import('./pages/other/LoginRegister1'));
const ForgotPassword = lazy(() => import('./pages/other/ForgotPassword'));
const PasswordReset = lazy(() => import('./pages/other/PasswordReset'));

const Cart = lazy(() => import('./pages/other/Cart'));
const Wishlist = lazy(() => import('./pages/other/Wishlist'));
const Compare = lazy(() => import('./pages/other/Compare'));
const Checkout = lazy(() => import('./pages/other/Checkout'));

const NotFound = lazy(() => import('./pages/other/NotFound'));

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchbanner())
    props.dispatch(
      loadLanguages({
        languages: {
          en: require('./translations/english.json'),
          fn: require('./translations/french.json'),
          de: require('./translations/germany.json'),
        },
      })
    );
  });

  return (
    <ToastProvider placement='top-right'>
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className='flone-preloader-wrapper'>
                  <div className='flone-preloader'>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + '/'}
                  component={HomeFashion}
                />

                {/* Homepages */}
                <Route
                  path={process.env.PUBLIC_URL + '/home-fashion'}
                  component={HomeFashion}
                />

                {/* Shop pages */}
                {/* <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                  component={ShopGridStandard}
                />  */}
                <Route
                  path={process.env.PUBLIC_URL + '/store/:slug/:slug'}
                  component={ShopGridStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/store/:slug'}
                  component={ShopGridStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/shop'}
                  component={ShopGridStandard1}
                />
  <Route
                  path={process.env.PUBLIC_URL + '/buynow'}
                  component={BuyNow}
                />
                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + '/product/:slug'}
                  render={(routeProps) => (
                    <Product
                      {...routeProps}
                      key={routeProps.match.params.productId}
                    />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/product-tab-left/:id'}
                  component={ProductTabLeft}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/product-tab-right/:id'}
                  component={ProductTabRight}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/product-sticky/:id'}
                  component={ProductSticky}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/product-slider/:id'}
                  component={ProductSlider}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/product-fixed-image/:id'}
                  component={ProductFixedImage}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + '/about'}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/wholesale'}
                  component={Wholesale}
                />

                <Route
                  path={process.env.PUBLIC_URL + '/privacy'}
                  component={Privacy}
                />


                <Route
                  path={process.env.PUBLIC_URL + '/careers'}
                  component={Employment}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/brandfeedback'}
                  component={BrandFeedback}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/tnc'}
                  component={TermsandConditions}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/contact'}
                  component={Contact}
                />
                <Route path={process.env.PUBLIC_URL + '/faq'} component={Faq} />
                <Route
                  path={process.env.PUBLIC_URL + '/return'}
                  component={Return}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/affliateprogram'}
                  component={AffliateProgram}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/shipping'}
                  component={Shipping}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/policy'}
                  component={Policy}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/customercare'}
                  component={CustomerCare}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/my-account'}
                  component={MyAccount}
                />

                <Route
                  path={process.env.PUBLIC_URL + '/my-orders'}
                  component={MyOrders}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/login'}
                  component={LoginRegister}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/register'}
                  component={LoginRegister1}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/forgot-password'}
                  component={ForgotPassword}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/password-reset'}
                  component={PasswordReset}
                />

                <Route
                  path={process.env.PUBLIC_URL + '/cart'}
                  component={Cart}
                />

                <Route
                  path={process.env.PUBLIC_URL + '/checkout2'}
                  component={Checkout2}
                />


                <Route
                  path={process.env.PUBLIC_URL + '/cancelorder'}
                  component={Cancel}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/wishlist'}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/compare'}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/successorder'}
                  component={Checkout}
                />

                <Route
                  path={process.env.PUBLIC_URL + '/not-found'}
                  component={NotFound}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
