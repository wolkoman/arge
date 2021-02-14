import React from 'react';
import {Site} from '../components/Site';
import {cockpitHost, fetchCollection} from '../util/cockpit';

export default function Themen({topics, cockpitHost}) {
  return <Site>
    <div className="text-5xl font-bold mb-6">Themen</div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {topics.map(topic => <div key={topic._id} style={{
        backgroundImage: `url(${cockpitHost}/${topic.image.path})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
      }} className="flex justify-center items-center h-32 rounded text-white font-bold text-xl relative overflow-hidden">
        <div className="bg-black absolute top-0 left-0 w-full h-full opacity-40"/>
        <div className="relative">{topic.title}</div>
      </div>)}
    </div>
  </Site>;
}

export async function getStaticProps() {
  const topics = (await fetchCollection('topics')).filter(topic => topic.category === undefined);
  return {props: {topics, cockpitHost}}
}