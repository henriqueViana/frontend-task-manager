import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App.tsx";
import { persistor, store } from "./store/store.ts";
import ToastProvider from "./context/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <ToastProvider />
      <App />
    </Provider>
  </PersistGate>
);
