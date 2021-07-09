import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, time, children }) => {
  const [delay, setDelay] = useState(true);
  useEffect(() => {
    const timerId = setTimeout(() => setDelay(false), time);
    return () => clearTimeout(timerId);
  }, [delay, time]);

  return <>{delay && <Alert variant={variant}>{children}</Alert>}</>;
};

Message.defaultProps = {
  variant: 'danger',
  time: 5000,
};

export default Message;
