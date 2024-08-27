import React from "react";

import ReactDom from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { PrivyProvider } from "@privy-io/react-auth";

import App from "./App";
import "./index.css";
import { StateContextProvider } from "./context";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <PrivyProvider
    appId="cm08ir0wt0423rzudld449dbb"
    config={{
      loginMethods: ["email", "wallet"],
      appearance: {
        theme: "dark",
      },
      embeddedWallets: {
        createOnLogin: "users-without-wallets",
      },
    }}
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </PrivyProvider>,
);
