import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

type Children = string | JSX.Element | JSX.Element[];

type Props = {
  variant: string;
  time: number;
  children: Children;
  fix?: boolean;
}

const Message = ({ variant, time, children, fix }: Props) => {
  const [delay, setDelay] = useState(true);
  useEffect(() => {
    const timerId = setTimeout(() => setDelay(false), time);
    return () => clearTimeout(timerId);
  }, [delay, time]);

  return (
    <>
      {fix ? (
        <Alert variant={variant}>{children}</Alert>
      ) : (
        delay && <Alert variant={variant}>{children}</Alert>
      )}
    </>
  );
};

Message.defaultProps = {
  variant: 'danger',
  time: 5000,
};

export default Message;

