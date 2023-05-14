import React, { useState } from 'react';
import { useParams, redirect, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';

type Props = {
  price: number;
  countInStock: number;
};

const AddToCart = ({ price, countInStock }: Props) => {
  const params = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  return (
    <>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>
                <strong>${price}</strong>
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Status:</Col>
              <Col>{countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
            </Row>
          </ListGroup.Item>

          {/* Quantity  */}
          {countInStock > 0 && (
            <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                  >
                    {[...Array(countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
          )}

          <ListGroup.Item>
            <Button
              className="btn-block"
              type="button"
              disabled={countInStock === 0}
              onClick={addToCartHandler}
              data-cy="btn-add-to-cart"
            >
              ADD TO CART
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default AddToCart;
