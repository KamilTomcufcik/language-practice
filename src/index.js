import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import { WordsListContextProvider } from './store/words-list-context';

ReactDOM.render(
  <AuthContextProvider>
    <WordsListContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WordsListContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
