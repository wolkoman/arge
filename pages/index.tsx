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
      <img src="assets/logo-04.svg" className="absolute right-0 mt-80 w-16" alt="logo"/>
      <Responsive>
        <Articles articles={articles} topics={topics} cockpitHost={cockpitHost} news={news}/>
      </Responsive>
    </Site>
  );
}

const NewsArticle = ({news}) => {
  return <div className="mx-2 my-4">
    <Link href={`/news/${news._id}`}>
    <div className="font-bold flex justify-between cursor-pointer">
      <div>{news.title}</div>
    </div>
    </Link>
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

function Articles({articles, topics, cockpitHost, news}) {
  return <div className="grid grid-cols-2 gap-6 mb-12">
    {articles.map(entry => {
      const link = entry.content[0].field?.name === 'content'
        ? `/artikel/${encodeSlug(entry.title)}`
        : `/themen/${getCategoryUrl(topics.find(t => t._id === entry.content[0].value._id), topics).join('/')}`;
      return (
        <div className="py-2 flex flex-col" key={entry._id}>
          <div className="">
            <Image path={cockpitHost + entry.image.path}/>
          </div>
          <div className="flex flex-col justify-center">
            <Link href={link}>
              <div className="text-2xl py-2 font-bold cursor-pointer text-primary-500">{entry.title}</div>
            </Link>
            <Markdown children={entry.preview}/>
            <Link href={link}>
              <div className="underline hover:no-underline cursor-pointer text-secondary-default">Weiterlesen</div>
            </Link>
          </div>
        </div>
      );
    })}
    <div className="p-4 bg-primary-500 rounded-lg text-white">
      <div className="font-bold text-4xl">Aktuell</div>
      {news.map(n => <NewsArticle news={n}/>)}
    </div>
  </div>;
}

const Title = () => (
  <div className="flex flex-row justify-center my-8">
    <div className="flex flex-col p-6 justify-center h-full text-primary-500 relative">
      <div className="text-5xl font-bold relative md:left-44 md:top-5 pb-4 md:pb-0">ARGE Schöpfungs&shy;verantwortung</div>
      <img className="w-full" src="assets/logo.png"/>
    </div>
  </div>
);

const Image = ({path}) => {
  return (
    <div className="w-full md:h-full min-h-md rounded border border-primary-500"
         style={{
           backgroundImage: `url(${path})`,
           backgroundSize: 'cover',
           backgroundPosition: '50% 50%'
         }}></div>
  );
}