import React from 'react';

import { Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { saveShippingAddress } from './cartSlice';

type Inputs = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type Props = {
  successUrl?: string;
};

const ShippingAddressForm = ({ successUrl = '/payment' }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const shippingAddress = useAppSelector((state) => state.cart.shippingAddress);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      address: shippingAddress?.address,
      city: shippingAddress?.city,
      postalCode: shippingAddress?.postalCode,
      country: shippingAddress?.country,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({
    address,
    city,
    postalCode,
    country,
  }) => {
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate(successUrl);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="address" className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Address"
          data-cy="form-address"
          {...register('address', { required: false })}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="city" className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter City"
          data-cy="form-city"
          {...register('city', { required: false })}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="postalCode" className="mb-3">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Postal Code"
          data-cy="form-postal-code"
          {...register('postalCode', { required: false })}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="country" className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Country"
          data-cy="form-country"
          {...register('country', { required: false })}
        ></Form.Control>
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        className="m-auto"
        data-cy="btn-continue"
      >
        Countinue
      </Button>
    </Form>
  );
};

export default ShippingAddressForm;
