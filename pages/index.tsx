import Link from 'next/link';
import React from 'react';
import {Responsive} from '../components/Responsive';
import {Site} from '../components/Site';
import {cockpitHost, fetchCollection} from '../util/cockpit';
import {encodeSlug} from '../util/slug';
import {getCategoryUrl} from '../components/HierachyArticles';
import Markdown from '../components/Markdown';
import {manualArticles} from "./artikel/[slug]";

export default function Home({articles, topics, news}) {
    return (
        <Site responsive={false} title="Plattform Schöpfungsverantwortung">
            <Title/>
            <div className="relative z-20">
                <Responsive>
                    {news.length > 0 && <div className="bg-white rounded-lg shadow my-24">
                        <div className="flex flex-col md:flex-row gap-8 justify-between p-6">
                            <div className="shrink-0">
                                <div className="text-4xl pt-2 font-bold">Aktuelles</div>
                            </div>
                            <div>
                                {news.map(n => <NewsArticle key={n._id} news={n}/>)}
                            </div>
                        </div>
                    </div>}
                    <Articles articles={articles} topics={topics}/>

                </Responsive>
            </div>
        </Site>
    );
}

const NewsArticle = ({news}) => {
    return <div className="my-2">
        <Link href={news.link ? news.link : `/news/${news._id}`}>
            <a
                className="block cursor-pointer border border-black text-lg hover:bg-primary-50 rounded-lg px-3 py-1">
                {news.title}
            </a>
        </Link>
    </div>;
}

export async function getStaticProps() {
    const news = await fetchCollection('news', {'sort[_created]': '-1', 'filter[active]': '1'});
    const activeSegment = [
        {date: "01.01", name: "christmas"},
        {date: "06.01", name: "general"},
        {date: "28.02", name: "fast"},
        {date: "06.04", name: "easter"},
        {date: "28.05", name: "summer"},
        {date: "01.08", name: "creation"},
        {date: "05.10", name: "general"},
        {date: "25.11", name: "christmas"},
    ].reverse().find(({date, name}) =>
        new Date() > new Date(new Date().getFullYear() + "-" + date.split(".").reverse().join("-"))
    ).name;
    const segmentNews = news.filter(n => n.segment === activeSegment);
    let articles = [...manualArticles, ...await fetchCollection('article', {'filter[hidden]': '0'}).then(articles =>
        articles.map(a => ({...a, priority: ["Enzyklika von Bartholomäus zur Schöpfungszeit","Liturgie in der Schöpfungszeit", "Schöpfungszeit"].indexOf(a.title)}))
    ), ];
    return {
        props: {
            news: segmentNews,
            articles,
            topics: await fetchCollection('topics'),
        },
        revalidate: 30
    };
}

function Articles({articles, topics}) {
    console.log(articles)
    return <div className="grid md:grid-cols-2 gap-10 mb-12">
        {articles.sort((b,a) => a.priority - b.priority).map(entry => {
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
                height="600px" width="100%" style={{maxWidth: 400, minWidth: 250, maxHeight: 'none!important',filter: "hue-rotate(267deg)"}}/>
    </div>;
}

const Title = () => (
    <div className="max-w-6xl w-full mx-auto my-24 bg-[url(/assets/hero.jpg)] bg-cover bg-center px-6 py-20 lg:pt-52 lg:px-28 shadow-lg rounded-lg">
                <div className="text-3xl relative text-white">
                    <div className="stroke-1">Glaube und Wissenschaft Hand in Hand</div>
                    <div className="absolute inset-0 z-10">Glaube und Wissenschaft Hand in Hand</div>
                </div>
                <div className="text-6xl font-bold text-primary-default relative">
                    <div className="stroke-2">für eine nachhaltige Zukunft</div>
                    <div className="absolute inset-0 z-10">für eine nachhaltige Zukunft</div>
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