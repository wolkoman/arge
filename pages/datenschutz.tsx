import React from 'react';
import {Site} from '../components/Site';
import {cockpitHost, fetchSingleton} from '../util/cockpit';
import Markdown from '../components/Markdown';

export default function Datenschutz({ datenschutz }) {
  return (
    <Site>
      <Markdown children={datenschutz.content} />
    </Site>
  );
}

export async function getStaticProps() {
  const datenschutz = await fetchSingleton('Datenschutz');
  return {
    props: {
      datenschutz,
      cockpitHost
    },
  };
}