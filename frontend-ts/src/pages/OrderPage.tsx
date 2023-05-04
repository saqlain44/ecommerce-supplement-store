import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { Button, ListGroup, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import {
  useOrderDetailsQuery,
  usePayOrderMutation,
  useMarkOrderDeliveredMutation,
} from '../features/order/orderApiSlice';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import OrderUserDeliverInfo from '../components/OrderUserDeliverInfo';
import OrderPaymentInfo from '../components/OrderPaymentInfo';
import OrderItemsInfo from '../components/OrderItemsInfo';
import OrderSummary from '../components/OrderSummary';
import ErrorMessage from '../components/ErrorMessage';

// Calculate price
const addDecimals = (num: number): number => {
  return +(Math.round(num * 100) / 100).toFixed(2);
};

const OrderPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const orderId = params.id || '';
  const user = useAppSelector((state) => state.auth.user);

  const { isLoading, isError, error, data, refetch } = useOrderDetailsQuery(
    orderId,
    {
      skip: !orderId,
    }
  );

  const [
    payOrder,
    {
      isLoading: isLoadingPayOrder,
      isError: isErrorPayOrder,
      error: errorPayOrder,
      data: dataPayOrder,
    },
  ] = usePayOrderMutation();

  const [
    markOrderDelivered,
    {
      isLoading: isLoadingMarkOrderDelivered,
      isError: isErrorMarkOrderDelivered,
      error: errorMarkOrderDelivered,
      data: dataMarkOrderDelivered,
    },
  ] = useMarkOrderDeliveredMutation();

  const [sdkReady, setSdkReady] = useState(false);
  const [itemsPrice, setItemsPrice] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    async function addPaypalScript() {
      try {
        const { data: clientId } = await axios.get('/api/config/paypal');

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
        script.async = true;

        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      } catch (e) {
        console.log(e);
      }
    }

    if (data && !data.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }

    // setItemsPrice
    if (data) {
      setItemsPrice(
        addDecimals(
          Number(
            data?.orderItems.reduce(
              (acc, item) => acc + +item.price * item.qty,
              0
            )
          )
        )
      );
    }
  }, [data]);

  useEffect(() => {
    if (dataPayOrder && dataPayOrder.isPaid) {
      refetch();
    }
  }, [dataPayOrder]);

  useEffect(() => {
    if (dataMarkOrderDelivered && dataMarkOrderDelivered.isDelivered) {
      refetch();
    }
  }, [dataMarkOrderDelivered]);

  const successPaymentHandler = (paymentResult: Record<string, string>) => {
    payOrder({ orderId, paymentId: paymentResult.id });
  };

  const deliverHandler = () => {
    markOrderDelivered(orderId);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Row>
      <Meta title="Nutrition-Strat Order" />
      <Col>
        <ListGroup variant="flush">
          <OrderUserDeliverInfo data={data} orderId={orderId} />
          <OrderPaymentInfo data={data} />
          <OrderItemsInfo data={data} />
        </ListGroup>
      </Col>
      <Col md={4}>
        <OrderSummary
          itemsPrice={itemsPrice}
          shippingPrice={data?.shippingPrice || 0}
          taxPrice={data?.taxPrice || 0}
          totalPrice={data?.totalPrice || 0}
        >
          <div>
            {isLoadingPayOrder && <Loader />}
            {isErrorPayOrder && <ErrorMessage error={errorPayOrder} />}
            {!data?.isPaid && (
              <ListGroup.Item>
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={data?.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
            {isLoadingMarkOrderDelivered && <Loader />}
            {isErrorMarkOrderDelivered && (
              <ErrorMessage error={errorMarkOrderDelivered} />
            )}
            {user && user.isAdmin && data?.isPaid && !data?.isDelivered && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </Button>
              </ListGroup.Item>
            )}
          </div>
        </OrderSummary>
      </Col>
    </Row>
  );
};

export default OrderPage;
