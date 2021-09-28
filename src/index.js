import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MultiLangWrapper from './components/MultiLangWrapper';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './state/app';

ReactDOM.render(
  <AppProvider>
    <BrowserRouter>
      <MultiLangWrapper>
        <Main />
      </MultiLangWrapper>
    </BrowserRouter>
  </AppProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
