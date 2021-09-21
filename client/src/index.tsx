import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthProvider from "./context/AuthContext";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider autoDismiss autoDismissTimeout={2500}>
          <App />
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
