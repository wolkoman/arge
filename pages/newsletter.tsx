import React from 'react';
import {Site} from '../components/Site';
import ReactMarkdown from 'react-markdown';
import {renderer} from '../util/markdownRenderer';
import {fetchSingleton} from '../util/cockpit';

export default function Newsletter({article}) {
  return <Site>
    <div className="text-5xl font-bold mb-6">Newsletter</div>
    <ReactMarkdown renderers={renderer} children={article.content}/>
  </Site>;
}

export async function getStaticProps() {
  return {props: {article: await fetchSingleton('newsletter')}}
}