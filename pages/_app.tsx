import "tailwindcss/tailwind.css";
import React from "react";
import { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClientProvider } from "react-query";
import "../public/css/style.scss";
import { PersistendQueryClient } from "pkg/query-client";
/**
 * Main entry point.
 */
function MyApp({ Component, pageProps }: AppProps) {
  const redirectUri = typeof window !== "undefined"
    ? window.location.origin
    : "/";

  return (
    <Auth0Provider
      domain="chronark.eu.auth0.com"
      clientId="vYchF5EyW95PVEd3IiG70Qz8AOzpsiAZ"
      redirectUri={redirectUri}
      cacheLocation="localstorage"
      audience="https://db.fauna.com/db/yt39guncryrrr"
      useRefreshToken={true}
    >
      <QueryClientProvider client={PersistendQueryClient()}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Auth0Provider>
  );
}

export default MyApp;
