import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container className='text-center py-3'>
        <Row>
          <Col>
            <span>Copyright &copy; Nutrition-Strat 2021</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
