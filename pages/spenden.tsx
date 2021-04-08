import React from 'react';
import {Site} from '../components/Site';
import {fetchSingleton} from '../util/cockpit';
import Markdown from '../components/Markdown';

export default function Spenden({article}) {
  return <Site>
    <div className="text-5xl font-bold mb-6 text-primary-500">Spenden</div>
    <Markdown children={article.content}/>
  </Site>;
}

export async function getStaticProps() {
  return {props: {article: await fetchSingleton('spenden')}}
}