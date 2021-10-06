import React from 'react';
import {Site} from '../components/Site';
import {fetchCollection, fetchSingleton} from '../util/cockpit';
import Markdown from '../components/Markdown';
import Link from 'next/link';

export default function Newsletter({article, newsletters}) {
  return <Site>
    <div className="text-5xl font-bold mb-6 text-primary-500">Newsletter</div>
    <Markdown children={article.content}/>
    <iframe className="mj-w-res-iframe" frameBorder="0" scrolling="no" src="https://app.mailjet.com/widget/iframe/6CzS/K8x" width="100%" height="400px"/>
    <div>
      <Markdown children="# Newsletter Archiv"/>
      {newsletters.map(newsletter => <Link href={newsletter.link} key={newsletter._id}>
        <div className="underline cursor-pointer my-4">{newsletter.label}</div>
      </Link>)}
    </div>
    <script type="text/javascript" src="https://app.mailjet.com/statics/js/iframeResizer.min.js"></script>
  </Site>;
}

export async function getServerSideProps() {
  const newsletters = await fetchCollection('newsletter');
  return {props: {newsletters, article: await fetchSingleton('newsletter')}}
}