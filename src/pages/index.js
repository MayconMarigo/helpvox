import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/login";
  }, []);
  return (
    <>
      <Head>
        <title>Call Receiver</title>
        <meta name="" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
    </>
  );
}
