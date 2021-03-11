import Link from 'next/link';
import React from 'react';
import {Site} from '../../components/Site';
import {cockpitHost, fetchCollection} from '../../util/cockpit';
import {encodeSlug} from '../../util/slug';

export default function Index({topics, cockpitHost}) {
  return <Site>
    <div className="text-5xl font-bold mb-12 text-primary-500">Themen</div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {topics.map(topic =>
        <Link href={`themen/${encodeSlug(topic.title)}`} key={topic._id}>
          <div key={topic._id} style={{
            backgroundImage: `url(${cockpitHost}/${topic.image.path})`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
          }}
               className="flex justify-center items-center h-64 rounded text-white font-bold text-xl relative overflow-hidden cursor-pointer">
            <div className="bg-black absolute top-0 left-0 w-full h-full opacity-40"/>
            <div className="relative">{topic.title}</div>
          </div>
        </Link>)}
    </div>
  </Site>;
}

export async function getStaticProps() {
  const topics = (await fetchCollection('topics')).filter(topic => !topic.category);
  return {props: {topics, cockpitHost}}
}