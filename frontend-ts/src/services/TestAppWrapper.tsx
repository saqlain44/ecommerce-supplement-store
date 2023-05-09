import React from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from '../app/store';

type Children = string | JSX.Element | JSX.Element[];

type Props = {
  children: Children;
  path?: string;
};

const TestAppWrapper = ({ children, path='/' }: Props) => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route path={path} element={children} />
          </Routes>
        </Router>
      </HelmetProvider>
    </Provider>
  );
};

export default TestAppWrapper;
