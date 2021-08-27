import Link from 'next/link';
import React, {useState} from 'react';
import {Responsive} from '../components/Responsive';
import {Site} from '../components/Site';
import {cockpitHost, fetchCollection, fetchSingleton} from '../util/cockpit';
import {encodeSlug} from '../util/slug';
import {getCategoryUrl} from '../components/HierachyArticles';
import Markdown from '../components/Markdown';

export default function Home({articles, topics, news, quote}) {
  return (
    <Site responsive={false}>
      <Title/>
      <div className="relative z-20">
        <Responsive>
          <Articles articles={articles} topics={topics} news={news} quote={quote}/>
        </Responsive>
      </div>
    </Site>
  );
}

const NewsArticle = ({news}) => {
  return <div className="my-2">
    <Link href={`/news/${news._id}`}>
      <div className="underline hover:no-underline cursor-pointer text-secondary-default">
        {news.title}
      </div>
    </Link>
  </div>;
}

export async function getStaticProps() {
  return {
    props: {
      news: await fetchCollection('news', {limit: '5'}),
      articles: await fetchCollection('article'),
      topics: await fetchCollection('topics'),
      quote: await fetchSingleton('quote')
    },
  };
}

function Articles({articles, topics, news, quote}) {
  return <div className="grid grid-cols-2 gap-6 mb-12">
    <!-- https://pixabay.com/illustrations/crowd-people-silhouettes-2045499/ -->
    <div className="py-2 flex flex-col">
      <div className="border-primary-default border bg-white rounded p-4 text-primary-500 font-bold text-center text-3xl flex items-center h-52" style={{ backgroundImage: `url(http://argeschoepfung.eni.wien/storage/uploads/2021/08/08/61103df0b1367wolken.jpg)`}}>
        {quote.text}
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-2xl py-2 font-bold cursor-pointer text-primary-500">Aktuell</div>
        {news.map(n => <NewsArticle news={n}/>)}
      </div>
    </div>
    {articles.map(entry => {
      const link = entry.content[0].field?.name === 'content'
        ? `/artikel/${encodeSlug(entry.title)}`
        : `/themen/${getCategoryUrl(topics.find(t => t._id === entry.content[0].value._id), topics).join('/')}`;
      return (
        <div className="py-2 flex flex-col" key={entry._id}>
          <div className="h-52">
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
  </div>;
}

const Title = () => (
  <div className="max-w-6xl w-full mx-auto">
    <div className="flex flex-row justify-center my-8">
      <div className="flex flex-col justify-center items-end text-primary-500 w-full pr-8">
        <div className="text-2xl font-bold text-secondary-default">30+ Jahre</div>
        <div className="text-5xl font-bold text-right">ARGE Schöpfungs&shy;verantwortung</div>
        <div className="text-2xl font-bold">Ökosoziale Bewegung</div>
      </div>
    </div>
    <div className="relative w-full h-32 md:h-60 lg:h-80 md:-mt-16 lg:-mt-32">
      <img src="/assets/logo.svg" className="relative"/>
    </div>
  </div>
);

const Image = ({path}) => {
  return <div className="w-full md:h-full min-h-md rounded border border-primary-500"
  style={{
    backgroundImage: `url(${path})`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%'
  }}/>;
}