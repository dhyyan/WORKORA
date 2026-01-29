import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store, { persistor } from './store/store.ts'
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from 'redux-persist/integration/react'
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>        
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
