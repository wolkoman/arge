import Link from 'next/link';
import React from 'react';
import {Site} from '../../components/Site';
import {cockpitHost, fetchCollection} from '../../util/cockpit';
import {encodeSlug} from '../../util/slug';

export default function Index({topics, cockpitHost}) {
  return <Site title="Themen">
    <div className="text-5xl font-bold mb-12">Themen</div>
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
  </Site>;
}

export async function getStaticProps() {
  const topics = (await fetchCollection('topics')).filter(topic => !topic.category && topic.hidden !== true);
  return {props: {topics, cockpitHost}, revalidate: 1}
}