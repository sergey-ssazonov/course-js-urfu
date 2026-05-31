import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import withQueryProvider from "app/providers/queryProvider";

import "./index.css";
import App from "./App.tsx";

const AppWithProviders = withQueryProvider(App);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
)
