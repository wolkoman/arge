import React from 'react';
import {Site} from '../components/Site';
import {fetchSingleton} from '../util/cockpit';
import Markdown from '../components/Markdown';

export default function Spenden({article}) {
  return <Site>
    <div className="text-5xl font-bold mb-6 text-primary-500">Spenden</div>
    <div className="flex flex-col-reverse md:flex-row  space-x-4">
      <div className="flex flex-col items-center w-full bg-primary-500 text-white px-2 py-12 rounded text-center text-xl">
        Wir freuen uns über Ihre Spenden an das Konto:
        <div className="font-black mt-4">AT12 2011 1292 5730 9601</div>
        <div className="mb-4 text-sm italic">Arbeitsgemeinschaft Schöpfungsverantwortung</div>
        <div className="text-xs mt-14">Wir arbeiten derzeit noch an einer einfachen Möglichkeit schnell und unkompliziert online zu spenden. </div>
      </div>
      <div><Markdown children={article.content}/></div>
    </div>

  </Site>;
}

export async function getStaticProps() {
  return {props: {article: await fetchSingleton('spenden')}}
}