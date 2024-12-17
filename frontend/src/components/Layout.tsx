import Head from "next/head";
import Header from "./Header";
import { ReactNode } from "react";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title?: string | null;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title || "Portfolio Aurélie"}</title>
        <meta name="description" content="Portfolio CAudrel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
