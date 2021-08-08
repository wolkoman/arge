import React from 'react';
import {Site} from '../components/Site';
import {fetchSingleton} from '../util/cockpit';
import Markdown from '../components/Markdown';

export default function Newsletter({article}) {
  return <Site>
    <div className="text-5xl font-bold mb-6 text-primary-500">Newsletter</div>
    <Markdown children={article.content}/>
    <iframe className="mj-w-res-iframe" frameBorder="0" scrolling="no" src="https://app.mailjet.com/widget/iframe/6CzS/K8x" width="100%" height="400px"/>
    <script type="text/javascript" src="https://app.mailjet.com/statics/js/iframeResizer.min.js"></script>
  </Site>;
}

export async function getStaticProps() {
  return {props: {article: await fetchSingleton('newsletter')}}
}