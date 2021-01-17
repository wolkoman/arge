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
    <div className="min-h-screen bg-primary-50 flex flex-col">
      <Head>
        <title>ARGE Schöpfungsverantwortung</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {responsive ? <Responsive>{children}</Responsive> : children}
      <div className="bg-white">
        <Responsive>
          <Footer />
        </Responsive>
      </div>
    </div>
  );
};
