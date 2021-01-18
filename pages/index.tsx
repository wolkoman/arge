import React from "react";
import ReactMarkdown from "react-markdown";
import { ColumnLayout } from "../components/ColumnLayout";
import { Responsive } from "../components/Responsive";
import { Site } from "../components/Site";
import { cockpitHost, fetchCollection, fetchSingleton } from "../util/cockpit";

export default function Home({ articles, pictures, test }) {
  return (
    <Site responsive={false}>
      <Title />
      {test}
      <Responsive>
        <ColumnLayout>
          <div className="mr-4 p-4 rounded-md bg-white">
            {pictures.map(({ path, meta }) => (
              <img
                src={path}
                key={path}
                className="mb-4 rounded"
                alt={meta.title}
              />
            ))}
          </div>
          <div className="p-4">
            {articles.entries.map(entry => (
              <div className="py-6" key={entry._id}>
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
      </Responsive>
    </Site>
  );
}

export async function getStaticProps(context) {
  const articles = await fetchCollection("article");
  const pictures = await fetchSingleton("frontpage_pictures");
  return articles
    ? {
        props: {
          articles,
          pictures: pictures.gallery.map(picture => ({
            ...picture,
            path: `${cockpitHost}/${picture.path}`,
          })),
        },
      }
    : {
        notFound: true,
      };
}

const Title = () => (
  <div className="flex flex-col md:flex-row w-full h-6xl md:h-3xl">
    <div className="max-w-7xl flex-0 md:w-2/3 w-full relative -top-24">
      <img className="w-full" src="assets/cbanner.png" />
    </div>
    <div className="flex flex-col p-6 leading-10 justify-center h-full -top-24 md:top-0 md:-left-24 relative font-bold">
      <div className="text-6xl text-primary-500">
        Spinnen wir den Faden weiter
      </div>
      <div className="text-2xl text-primary-500">
        und nehmen wir unsere Verantwortung ernst!
      </div>
    </div>
  </div>
);
