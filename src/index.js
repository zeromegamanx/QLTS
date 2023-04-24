import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from 'react-intl';
import Wrapper from "./components/Wrapper";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from 'react-router-dom';

//Gọi reducers
import reducers from "./reducers/index";
//Tạo store
const store = createStore(reducers);

// Để các component khác có thể lấy dữ liệu chúng ta cần phải bọc các component vào trong Provider

ReactDOM.render(
  // Mọi thứ sẽ được render cần phải được bọc bên trong BrowserRouter
  <BrowserRouter>
    <React.StrictMode>
      {/* Để các component khác có thể lấy dữ liệu chúng ta cần phải bọc các component vào trong Provider. */}
      <Provider store={store}>
        <Wrapper>
          <App date={Date.now()} />
        </Wrapper>,
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();