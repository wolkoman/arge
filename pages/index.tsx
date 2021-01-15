import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ColumnLayout } from "../components/ColumnLayout";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Responsive } from "../components/Responsive";

export default function Home({ data }) {
  return (
    <div className="min-h-screen bg-primary-50">
      <Head>
        <title>ARGE Schöpfungsverantwortung</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Title />
      <Responsive>
        <ColumnLayout>
          <div className="mr-4 p-4 rounded-md bg-white"></div>
          <div className="p-4">
            {data.entries.map(entry => (
              <div className="py-6">
                <div className="text-2xl py-2 font-bold">{entry.title}</div>
                <ReactMarkdown
                  renderers={{
                    strong: value => (
                      <span
                        className="font-bold text-pink-600"
                        children={value.children}
                      />
                    ),
                    emphasis: value => (
                      <span className="italic" children={value.children} />
                    ),
                  }}
                >
                  {entry.content}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </ColumnLayout>
        <Footer />
      </Responsive>
      <div className="container mx-auto max-w-4xl"></div>
    </div>
  );
}

export async function getStaticProps(context) {
  const apiKey = "20ada0647adb0e6ea47f6614154a8c";
  const res = await fetch(
    `http://api.arge.eni.wien/api/collections/get/article?token=${apiKey}`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}

const Title = () => (
  <div>
    <div className="flex flex-row w-full h-3xl">
      <div className="max-w-7xl flex-0 w-2/3 relative -top-24">
        <img className="w-full" src="assets/cbanner.png" />
      </div>
      <div className="flex flex-col p-6 leading-10 justify-center h-full -left-24 relative font-bold">
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
