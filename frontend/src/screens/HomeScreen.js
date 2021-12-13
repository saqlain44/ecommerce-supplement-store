import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import LatestProducts from '../components/LatestProducts';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import TrendingProtein from '../components/TrendingProtein';
import TrendingBcaa from '../components/TrendingBcaa';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword && match.url === '/' ? (
        <>
          <ProductCarousel />
          <Row className='p-2 my-3'>
            <Col>
              <Row xs='auto'>
                <Col>
                  <h5
                    className='fw-bold'
                    style={{ position: 'relative', top: '7px' }}
                  >
                    <i className='fas fa-bolt'></i>
                    &nbsp; LATEST PRODUCTS
                  </h5>
                </Col>
                <Col>
                  <Link to='/products' className='btn btn-success'>
                    View All
                  </Link>
                </Col>
              </Row>
              <LatestProducts />
            </Col>
          </Row>

          <Row className='p-2 my-3'>
            <Col>
              <Row xs='auto'>
                <Col>
                  <h5 className='fw-bold'>
                    <i className='fas fa-poll'></i>
                    &nbsp; TRENDING IN PROTEIN{' '}
                  </h5>
                </Col>
              </Row>
              <TrendingProtein />
            </Col>
          </Row>

          <Row className='p-2 my-3'>
            <Col>
              <Row xs='auto'>
                <Col>
                  <h5 className='fw-bold'>
                    <i className='fas fa-poll'></i>
                    &nbsp; TRENDING IN AMINOS/BCAA
                  </h5>
                </Col>
              </Row>
              <TrendingBcaa />
            </Col>
          </Row>
        </>
      ) : (
        (keyword || match.url !== '/') && (
          <>
            <Link to='/' className='btn btn-dark'>
              GO BACK
            </Link>

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                <Row>
                  {products.map((product) => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                      <Product product={product} redirect={match.url} />
                    </Col>
                  ))}
                </Row>
                <Paginate
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ''}
                />
              </>
            )}
          </>
        )
      )}
    </>
  );
};

export default HomeScreen;
