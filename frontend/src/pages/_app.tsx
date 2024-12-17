import "@/styles/index.scss";
import type { AppProps } from "next/app";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return;

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
