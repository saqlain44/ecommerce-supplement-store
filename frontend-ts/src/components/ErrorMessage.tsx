import React from 'react';

import Message from './Message';
import { isFetchBaseQueryError, isErrorWithMessage } from '../services/helpers';

type Props = {
  error: unknown;
};

const ErrorMessage = ({ error }: Props) => {
  if (isFetchBaseQueryError(error)) {
    // you can access all properties of `FetchBaseQueryError` here
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    return <Message variant="danger">{errMsg}</Message>;
  } else if (isErrorWithMessage(error)) {
    // you can access a string 'message' property here
    return <Message variant="danger">{error.message}</Message>;
  }

  return null;
};

export default ErrorMessage;
