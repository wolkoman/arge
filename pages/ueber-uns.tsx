import Head from "next/head";
import React from "react";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-50">
      <Head>
        <title>ARGE Schöpfungsverantwortung</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Title />
      <div className="container mx-auto max-w-4xl"></div>
    </div>
  );
}

const Title = () => (
  <div>
    <div className="flex flex-row w-full h-3xl">
      <div className="max-w-7xl flex-0 w-2/3 relative -top-24">
        <img className="w-full" src="assets/cbanner.png" />
      </div>
      <div className="flex flex-col p-6 leading-10 justify-center h-full -left-24 relative">
        <div className="text-6xl text-primary-500">
          Spinnen wir den Faden weiter
        </div>
        <div className="text-2xl text-primary-500">
          und nehmen wir unsere Verantwortung ernst!
        </div>
      </div>
    </div>
  </div>
);
