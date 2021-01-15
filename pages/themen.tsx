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
      <div className="container mx-auto max-w-4xl"></div>
    </div>
  );
}
