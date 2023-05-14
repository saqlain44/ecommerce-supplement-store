import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { savePaymentMethod } from './cartSlice';

const PaymentMethodForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>
          <span className="select-method">Select Method</span>
        </Form.Label>
        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="paypal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        className="my-3"
        data-cy="btn-continue"
      >
        Countinue
      </Button>
    </Form>
  );
};

export default PaymentMethodForm;
