import Link from 'next/link';
import React from 'react';
import {Responsive} from '../components/Responsive';
import {Site} from '../components/Site';
import {cockpitHost, fetchCollection, fetchSingleton} from '../util/cockpit';
import {encodeSlug} from '../util/slug';
import {getCategoryUrl} from '../components/HierachyArticles';
import Markdown from '../components/Markdown';

export default function Home({articles, topics, news, quote}) {
    return (
        <Site responsive={false} title="ARGE Schöpfungsverantwortung">
            <Title/>
            <div className="relative z-20">
                <Responsive>
                    <div className="bg-white rounded-lg shadow-lg my-24 lg:-mx-12">
                        <div className="flex flex-col md:flex-row justify-between p-6">
                            <div>
                                <div className="text-4xl pt-2 font-bold text-secondary-default">Aktuelles</div>
                                <div className="text-2xl pb-6 text-primary-500">{quote.text}</div>
                            </div>
                            <div>
                                {news.map(n => <NewsArticle key={n._id} news={n}/>)}
                            </div>
                        </div>
                    </div>
                    <Articles articles={articles} topics={topics} news={news} quote={quote}/>
                </Responsive>
            </div>
        </Site>
    );
}

const NewsArticle = ({news}) => {
    return <div className="my-2">
        <Link href={`/news/${news._id}`}>
            <div
                className="cursor-pointer border border-primary-500 hover:bg-primary-50 rounded-lg px-3 py-1">
                {news.title}
            </div>
        </Link>
    </div>;
}

export async function getStaticProps() {
    return {
        props: {
            news: (await fetchCollection('news', {'sort[_created]': '-1', 'filter[active]': '1'})),
            articles: await fetchCollection('article'),
            topics: await fetchCollection('topics'),
            quote: await fetchSingleton('quote')
        },
        revalidate: 1
    };
}

function Articles({articles, topics, news, quote}) {
    return <div className="grid md:grid-cols-2 gap-10 mb-12">
        {articles.map(entry => {
            const link = entry.content[0].field?.name === 'content'
                ? `/artikel/${encodeSlug(entry.title)}`
                : `/themen/${getCategoryUrl(topics.find(t => t._id === entry.content[0].value._id), topics).join('/')}`;
            return (
                <Link href={link}>
                    <div className="flex flex-col bg-white rounded-lg shadow overflow-hidden cursor-pointer" key={entry._id}>
                        <div className="h-52">
                            <Image path={cockpitHost + entry.image.path}/>
                        </div>
                        <div className="flex flex-col justify-center p-6">
                            <div className="text-2xl py-2 font-bold cursor-pointer text-primary-500">{entry.title}</div>
                            <Markdown children={entry.preview}/>
                            <div
                                className="underline hover:no-underline cursor-pointer text-secondary-default">Weiterlesen
                            </div>
                        </div>
                    </div>
                </Link>
            );
        })}
    </div>;
}

const Title = () => (
    <div className="max-w-6xl w-full mx-auto my-24">
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
    return <div className="w-full md:h-full min-h-md"
                style={{
                    backgroundImage: `url(${path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 50%'
                }}/>;
}