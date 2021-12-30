import React from 'react';
import ReactDOM from 'react-dom';
import { RoutesFunction } from './Routes';

import './styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <RoutesFunction />
  </React.StrictMode>,
  document.getElementById('root')
);
