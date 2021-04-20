import Link from 'next/link';
import React, {useState} from 'react';
import {Responsive} from '../components/Responsive';
import {Site} from '../components/Site';
import {cockpitHost, fetchCollection} from '../util/cockpit';
import {encodeSlug} from '../util/slug';
import {getCategoryUrl} from '../components/HierachyArticles';
import Markdown from '../components/Markdown';

export default function Home({articles, cockpitHost, topics, news}) {
  return (
    <Site responsive={false}>
      <Title/>
      <img src="assets/Artboard 2@2x.png" className="absolute right-0 mt-80" alt="logo"/>
      <Responsive>
        <Articles articles={articles} topics={topics} cockpitHost={cockpitHost}/>
        <div className="mt-8 mb-12">
          <div className="text-primary-500 font-bold text-4xl my-4 rounded-lg">News</div>
          {news.map(n => <NewsArticle news={n}/>)}
        </div>
      </Responsive>
    </Site>
  );
}

const NewsArticle = ({news}) => {
  const [open, setOpen] = useState(false);
  return <div className="my-2 px-4 py-2 bg-white">
    <div className="font-bold flex justify-between cursor-pointer" onClick={() => setOpen(open => !open)}>
      <div>{news.title}</div>
      <div className="pt-1"><div className={`border-l-2 border-b-2 border-black w-2 h-2 transform ${open ? 'rotate-135' : '-rotate-45'} transition-all`}/></div>
    </div>
    <div className={`${open ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}><Markdown children={news.content}/> </div>
  </div>;
}

export async function getStaticProps() {
  const news = await fetchCollection('news', {limit: '5'});
  const articles = await fetchCollection('article');
  const topics = await fetchCollection('topics');
  return {
    props: {
      news,
      articles,
      topics,
      cockpitHost
    },
  };
}

function Articles({articles, topics, cockpitHost}) {
  return <>
    {articles.map((entry, i) => {
      const link = entry.content[0].field?.name === 'content'
        ? `/artikel/${encodeSlug(entry.title)}`
        : `/themen/${getCategoryUrl(topics.find(t => t._id === entry.content[0].value._id), topics).join('/')}`;
      return (
        <div className={`py-2 flex flex-col md:flex-row ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
             key={entry._id}>
          <div className={`md:w-1/3 ${i % 2 === 0 ? 'mr-4' : 'ml-4'} md:h-64`}>
            <Image path={cockpitHost + entry.image.path}/>
          </div>
          <div className="md:w-2/3 flex flex-col justify-center">
            <Link href={link}>
              <div className="text-2xl py-2 font-bold cursor-pointer text-primary-500">{entry.title}</div>
            </Link>
            <Markdown children={entry.preview}/>
            <Link href={link}>
              <div className="underline hover:no-underline cursor-pointer mt-2 text-primary-300">Weiterlesen</div>
            </Link>
          </div>
        </div>
      );
    })}
  </>;
}

const Title = () => (
  <div className="flex flex-col md:flex-row w-full h-6xl md:h-3xl">
    <div className="max-w-7xl flex-0 md:w-2/3 w-full relative -top-24">
      <img className="w-full" src="assets/Artboard 1@2x.png" style={{pointerEvents: 'none'}}/>
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

const Image = ({path}) => {
  return (
    <div className="w-full md:h-full min-h-md rounded border border-primary-400"
         style={{
           backgroundImage: `url(${path})`,
           backgroundSize: 'cover',
           backgroundPosition: '50% 50%'
         }}></div>
  );
}