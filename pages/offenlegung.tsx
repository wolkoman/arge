import React from 'react';
import {Site} from '../components/Site';
import {cockpitHost, fetchSingleton} from '../util/cockpit';

export default function Datenschutz({ datenschutz }) {
  return (
    <Site title="Offenlegung">
      Herausgeber, Alleininhaber und Redaktion:<br/>
      Manuel Wolkowitsch<br/>
        <br/>
      E-Mail-Adresse<br/>
      admin (at) eni.wien<br/>
        <br/>
      Website<br/>
      pgr-initiative.at<br/>
        <br/>
      Autor und Gestalter<br/>
      Manuel Wolkowitsch<br/>
        Draschestraße 105, 1230 Wien<br/>
    </Site>
  );
}

export async function getStaticProps() {
  const datenschutz = await fetchSingleton('Datenschutz');
  return {
    props: {
      datenschutz,
      cockpitHost
    },revalidate: 1
  };
}