import { RouterProvider } from "react-router-dom";
import { router } from "../routes/Router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import ThemeProvider from "@/theme/Theme";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const clientId =
    import.meta.env.VITE_APP_GOOGLE_CLIENT_ID ||
    process.env.VITE_APP_GOOGLE_CLIENT_ID ||
    "client-id";
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <GoogleOAuthProvider clientId={clientId}>
              <RouterProvider router={router} />
              <ToastContainer />
            </GoogleOAuthProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
