import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./store/store";
import ModalProvider from "./context/ModalContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    
    <Provider store={store}>
          <BrowserRouter>
          <ModalProvider>
            <App />
          </ModalProvider>
          </BrowserRouter>
    </Provider>
 
);
