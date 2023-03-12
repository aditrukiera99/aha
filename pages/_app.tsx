import "../styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.min.css";
import { Auth0Provider } from '@auth0/auth0-react';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Auth0Provider
    domain={'dev-ov814e72uphp5wg3.us.auth0.com'}
    clientId={'oiZFySNE0LoMghLwl9jt2IJARYliwuUM'}
    authorizationParams={{
      redirect_uri: 'http://localhost:2095/socialAuth'
    }}>
      <Component {...pageProps} />
  </Auth0Provider>
  );
};

export default App;
