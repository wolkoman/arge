import React, {useEffect, useState} from 'react';
import {Site} from '../components/Site';
import {fetchSingleton} from '../util/cockpit';
import Markdown from '../components/Markdown';

export default function Spenden({}) {
  const buildColor = "#643F0F";
  const imageUrl = 'https://api.netlify.com/api/v1/badges/dab48f2e-d6f3-4c3e-bdbb-860989e07100/deploy-status';
  const [showUpdate, setShowUpdate] = useState(false);
  const isUpdateable = () => fetch(imageUrl).then(x => x.text()).then(x => x.indexOf(buildColor) === -1)
  useEffect(() => {
    isUpdateable().then(x => setShowUpdate(x));
  }, []);
  const update = () => {
    isUpdateable()
      .then(x => x ? Promise.resolve() : Promise.reject())
      .then(() => window.location.assign("/api/update"))
      .catch(() => window.location.reload());
  };
  return <Site>
    <div className="text-5xl font-bold mb-6 text-primary-500">Status</div>
    <div className="mt-8 mb-4 text-primary-500 text-lg font-bold">Aktueller Status</div>
    <img src={imageUrl} className="w-40"/>
    {showUpdate ? <>
    <div className="mt-8 mb-4 text-primary-500 text-lg font-bold">Daten aus Cockpit übernehmen</div>
    <a href="api/update">
      <div className="my-2 px-2 bg-blue-900 text-white rounded hover:opacity-90 inline-block cursor-pointer" style={{background: '#0e1e25'}} onClick={update}>
        aktualisieren
      </div>
    </a>
    </> : null}
  </Site>;
}
