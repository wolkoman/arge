import Link from 'next/link';
import React from 'react';
import {Responsive} from '../components/Responsive';
import {Site} from '../components/Site';
import {cockpitHost, fetchCollection} from '../util/cockpit';
import {encodeSlug} from '../util/slug';

export default function Home({articles, topics, news, quote}) {
    return (
        <Site responsive={false} title="Schöpfungsverantwortung">
            <Title/>
            <div className="relative z-20">
                <Responsive>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {topics.map(topic =>
                            <Link href={`themen/${encodeSlug(topic.title)}`} key={topic._id}>
                                <div key={topic._id} style={{
                                    backgroundImage: `url(${cockpitHost}/${topic.image?.path})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: '50% 50%',
                                }}
                                     className="flex justify-center items-center h-64 rounded-lg shadow-xl overflow-hidden cursor-pointer transition transform hover:scale-105">
                                    <div className="bg-black absolute top-0 left-0 w-full h-full opacity-40"/>
                                    <div className="relative text-white font-bold text-2xl">{topic.title}</div>
                                </div>
                            </Link>)}
                    </div>
                </Responsive>
            </div>
        </Site>
    );
}


export async function getStaticProps() {
    const topics = (await fetchCollection('topics')).filter(topic => !topic.category && topic.hidden !== true);
    return {props: {topics}};
}

const Title = () => (
    <div className="max-w-6xl w-full mx-auto my-24">
        <div className="flex flex-row justify-center my-8">
            <div className="flex flex-col justify-center text-primary-500 w-full pr-8">
                <div className="text-5xl">Enzyklopädie der</div>
                <div className="text-7xl font-bold">Schöpfungsverwantwortung</div>
                <div className="mt-6 opacity-70">Inhalte ursprünglich erstellt vom Verein "ARGE Schöpfungsverantwortung"<br/>Inhalte sind rechtefrei verwendbar.</div>
            </div>
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