import Head from "next/head";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="h-[calc(100vh-80px)] bg-gradient-to-b from-gray-700 to-gray-900">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default MyApp;
