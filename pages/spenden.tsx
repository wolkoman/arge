import React from 'react';
import {Site} from '../components/Site';
import {fetchSingleton} from '../util/cockpit';
import Markdown from '../components/Markdown';

export default function Spenden({article}) {
  return <Site>
    <div className="text-5xl font-bold mb-6 text-primary-500">Spenden</div>
    <div className="flex flex-col md:flex-row">
      {/* @ts-ignore */ }
      <iframe allowpaymentrequest="true" className="flex-shrink-0 pr-4" src="https://donorbox.org/embed/arge-schopfungsverantwortung?default_interval=o&hide_donation_meter=true"
    name="donorbox" frameBorder="0" scrolling="no"
    height="800px" width="100%" style={{maxWidth: 400, minWidth: 250, maxHeight: 'none!important'}}/>
      <div><Markdown children={article.content}/></div>
    </div>

  </Site>;
}

export async function getStaticProps() {
  return {props: {article: await fetchSingleton('spenden')}}
}