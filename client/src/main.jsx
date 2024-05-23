import React from 'react'
import ReactDOM from 'react-dom/client'
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RecoilRoot>
        <App />
        </RecoilRoot>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
