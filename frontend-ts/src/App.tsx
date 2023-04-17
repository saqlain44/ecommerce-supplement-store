import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search/:keyword" element={<Products />} />
          <Route path="/page/:pageNumber" element={<Products />} />
          <Route path="/search/:keyword/page/:pageNumber" element={<Products />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
