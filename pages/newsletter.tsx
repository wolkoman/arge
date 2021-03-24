import React from 'react';
import {Site} from '../components/Site';
import ReactMarkdown from 'react-markdown';
import {renderer} from '../util/markdownRenderer';
import {fetchSingleton} from '../util/cockpit';

export default function Newsletter({article}) {
  return <Site>
    <div className="text-5xl font-bold mb-6 text-primary-500">Newsletter</div>
    <ReactMarkdown renderers={renderer} children={article.content}/>
    <iframe className="mj-w-res-iframe" frameBorder="0" scrolling="no"
  src="https://app.mailjet.com/widget/iframe/6CzS/Ijs" width="100%" height="600"/>
    <script type="text/javascript" src="https://app.mailjet.com/statics/js/iframeResizer.min.js"/>
  </Site>;
}

export async function getStaticProps() {
  return {props: {article: await fetchSingleton('newsletter')}}
}