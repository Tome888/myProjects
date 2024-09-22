import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserLoginContextProvider } from "./context/UserLoginContext.tsx";
import { RestArrContextProvider } from "./context/RestArrContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserLoginContextProvider>
      <RestArrContextProvider>
        <App />
      </RestArrContextProvider>
    </UserLoginContextProvider>
  </StrictMode>
);
