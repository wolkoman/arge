import Head from 'next/head';
import React from 'react';
import {Footer} from './Footer';
import {Navbar} from './Navbar';
import {Responsive} from './Responsive';
import {GoogleAnalytics} from './GoogleAnalytics';

export const Site = ({
  children,
  responsive = true,
}: {
  children: any;
  responsive?: boolean;
}) => {
  return (
    <div className="min-h-screen bg-primary-50 print:bg-white flex flex-col justify-between">
      <Head>
        <title>ARGE Schöpfungsverantwortung</title>
        <link rel="icon" href="/favicon.ico" />
        <GoogleAnalytics/>
      </Head>
      <div>
        <Navbar />
        {responsive ? <div className="my-8"><Responsive>{children}</Responsive></div> : children}
      </div>
      <div className="bg-white">
        <Responsive>
          <Footer />
        </Responsive>
      </div>
    </div>
  );
};
