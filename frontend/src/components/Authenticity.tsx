import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Authenticity = () => {
  return (
    <Row className="bg-light p-4 text-dark">
      <Col className="text-center">
        <h4>Authenticity Information When Buying Your Supplements</h4>
        <LinkContainer to="/authenticity">
          <Button variant="outline-warning" className="fw-bold">
            BUY AUTHENTIC &nbsp;
            <i
              className="fas fa-caret-right"
              style={{
                position: 'relative',
                top: '2px',
                fontSize: '20px',
              }}
            ></i>
          </Button>
        </LinkContainer>
      </Col>
    </Row>
  );
};

export default Authenticity;
