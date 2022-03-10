import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {Site} from '../../components/Site';
import {cockpitHost, fetchCollection} from '../../util/cockpit';

export default function Spenden({topics, articles}) {
  return <Site title="Spenden">
    <div className="text-5xl font-bold mb-6 text-primary-500">Seitenstruktur</div>
    <div className="text-lg font-bold mt-8">Über uns</div>
    {articles.map(item => <Item item={item} collection="ueberuns" key={item._id}/>)}
    <div className="text-lg font-bold mt-8">Themen</div>
    {topics.map(item => <Item item={item} collection="topics" key={item._id}/>)}
  </Site>;
}
function Item({item, collection}){
  return <div>
    <div className="underline hover:no-underline">
      <Link href={`${cockpitHost}/collections/entry/${collection}/${item._id}`}>{item.title}</Link>
    </div>
    <div className="pl-8">
      {item.children?.map(child => <Item item={child} collection={collection} key={child._id}/>)}
    </div>
  </div>
}

export async function getServerSideProps() {

  const [topics, ueberuns] = [await fetchCollection('topics'), await fetchCollection('ueberuns')];
  let [toplevelTopics, topLevelUeberuns] = [topics, ueberuns].map(items => items.filter(topic => !topic.category));

  function populateChildren(items: any[], allItems: any[]) {
    return items.map(item => ({...item, children: populateChildren(allItems.filter(allItem => allItem.category?._id === item._id), allItems)}));
  }

  return {props: {
      topics: populateChildren(toplevelTopics, topics),
      articles: populateChildren(topLevelUeberuns, ueberuns),
    }}
}