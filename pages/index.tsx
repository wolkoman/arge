import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import {Responsive} from '../components/Responsive';
import {Site} from '../components/Site';
import {cockpitHost, fetchCollection} from '../util/cockpit';
import {renderer} from '../util/markdownRenderer';
import {encodeSlug} from '../util/slug';

export default function Home({articles, cockpitHost}) {
  return (
    <Site responsive={false}>
      <Title/>
      <img src="assets/Artboard 2@2x.png" className="absolute right-0 mt-80"/>
      <Responsive>
        {articles.map((entry, i) => (
          <div className={`py-8 flex flex-col md:flex-row ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`} key={entry._id}>
            <div className={`md:w-1/3 ${i % 2 === 0 ? 'mr-4' : 'ml-4'} md:h-64 h-64`}>
              <div className="w-full h-full border border-primary-500 rounded" style={{
                backgroundImage: `url(${cockpitHost}/${entry.image.path})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%'
              }}/>
            </div>
            <div className="md:w-2/3">
              <div className="text-2xl py-2 font-bold">{entry.title}</div>
              <ReactMarkdown renderers={renderer} children={entry.preview}/>
              <Link href={`/artikel/${encodeSlug(entry.title)}`}>
                <div className="underline hover:no-underline cursor-pointer mt-2 text-primary-500">Weiterlesen</div>
              </Link>
            </div>
          </div>
        ))}
      </Responsive>
    </Site>
  );
}

export async function getStaticProps() {
  const articles = await fetchCollection('article');
  return {
    props: {
      articles,
      cockpitHost
    },
  };
}

const Title = () => (
  <div className="flex flex-col md:flex-row w-full h-6xl md:h-3xl">
    <div className="max-w-7xl flex-0 md:w-2/3 w-full relative -top-24">
      <img className="w-full" src="assets/Artboard 1@2x.png"/>
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
