import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthProvider from "./context/AuthContext";
import { ToastProvider } from "react-toast-notifications";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/index.html">
      <ErrorBoundary>
        <AuthProvider>
          <ToastProvider autoDismiss autoDismissTimeout={2500}>
            <App />
          </ToastProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
