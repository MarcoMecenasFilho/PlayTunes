import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Content />
      </div>
    </BrowserRouter>
  );
}
