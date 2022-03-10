import {cockpitHost, fetchCollection} from '../../util/cockpit';
import {encodeSlug} from '../../util/slug';
import {Site} from '../../components/Site';
import React from 'react';
import {Breadcrums} from '../../components/Breadcrums';
import Markdown from '../../components/Markdown';

export default function Article({news}) {
  return <Site title={news.title}>
    <div className="text-3xl font-bold mb-6 text-primary-500">{news.title}</div>
    <Markdown children={news.content}/>
  </Site>;
}

export async function getServerSideProps(x) {
  const news = (await fetchCollection('news', {limit: '5', "filter[_id]": x.params.id}))[0];
  return {
    props: {
      news,
      cockpitHost
    },
  };
}