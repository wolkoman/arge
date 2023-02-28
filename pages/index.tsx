import Link from 'next/link';
import React from 'react';
import {Responsive} from '../components/Responsive';
import {Site} from '../components/Site';
import {cockpitHost, fetchCollection, fetchSingleton} from '../util/cockpit';
import {encodeSlug} from '../util/slug';
import {getCategoryUrl} from '../components/HierachyArticles';
import Markdown from '../components/Markdown';

export default function Home({articles, topics, news}) {
    return (
        <Site responsive={false} title="Plattform Schöpfungsverantwortung">
            <Title/>
            <div className="relative z-20">
                <Responsive>
                    <div className="bg-white rounded-lg shadow my-24">
                        <div className="flex flex-col md:flex-row gap-8 justify-between p-6">
                            <div className="shrink-0">
                                <div className="text-4xl pt-2 font-bold">Aktuelles</div>
                            </div>
                            <div>
                                {news.map(n => <NewsArticle key={n._id} news={n}/>)}
                            </div>
                        </div>
                    </div>
                    <Articles articles={articles} topics={topics}/>

                </Responsive>
            </div>
        </Site>
    );
}

const NewsArticle = ({news}) => {
    return <div className="my-2">
        <Link href={`/news/${news._id}`}>
            <div
                className="cursor-pointer border border-black text-lg hover:bg-primary-50 rounded-lg px-3 py-1">
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
        },
        revalidate: 10
    };
}

function Articles({articles, topics}) {
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
                                className="underline hover:no-underline cursor-pointer">Weiterlesen
                            </div>
                        </div>
                    </div>
                </Link>
            );
        })}

        {/* @ts-ignore */}
        <iframe allowpaymentrequest="true" className="flex-shrink-0 pr-8" src="https://donorbox.org/embed/arge-schopfungsverantwortung?default_interval=o&hide_donation_meter=true"
                name="donorbox" frameBorder="0" scrolling="no"
                height="600px" width="100%" style={{maxWidth: 400, minWidth: 250, maxHeight: 'none!important'}}/>
    </div>;
}

const Title = () => (
    <div className="max-w-6xl w-full mx-auto my-24 bg-[url(/assets/hero.jpg)] bg-cover bg-center text-white px-6 py-20 lg:pt-52 lg:px-28 rounded-lg">
                <div className="text-3xl ">Glaube und Naturwissenschaft Hand in Hand </div>
                <div className="text-6xl font-bold">für eine nachhaltige Zukunft</div>
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