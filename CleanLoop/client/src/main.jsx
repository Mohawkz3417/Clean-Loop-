import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './lib/auth.jsx';
import { MetaProvider } from './lib/meta.jsx';
import { ToastProvider } from './lib/toast.jsx';
import { I18nProvider } from './lib/i18n.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <ToastProvider>
          <MetaProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </MetaProvider>
        </ToastProvider>
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
