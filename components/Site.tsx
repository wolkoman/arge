import Head from "next/head";
import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Responsive } from "./Responsive";

export const Site = ({
  children,
  responsive = true,
}: {
  children: any;
  responsive?: boolean;
}) => {
  return (
    <div className="min-h-screen bg-primary-50 print:bg-white flex flex-col">
      <Head>
        <title>ARGE Schöpfungsverantwortung</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {responsive ? <div className="my-8"><Responsive>{children}</Responsive></div> : children}
      <div className="bg-white">
        <Responsive>
          <Footer />
        </Responsive>
      </div>
    </div>
  );
};
