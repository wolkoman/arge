import React from 'react';
import {cockpitHost, fetchCollection} from '../util/cockpit';
import {encodeSlug} from '../util/slug';
import {ExtendedLayout} from './ExtendedLayout';

const system = (collectionName: string, url:string, displayName: string) => ({
  component: ({cockpitHost, item, children, parents}) =>  <ExtendedLayout
    crums={[{name: displayName, link: `/${url}`},
      ...parents.map(({name, segments}) => ({
        name,
        link: `/${url}/${segments.join('/')}`
      })), {name: item.title}]}
    title={item.title}
    files={item.files}
    subsites={children}
    content={item.content}
    cockpitHost={cockpitHost}
  />,
  paths: async () => {
    const items = (await fetchCollection(collectionName));
    const hierachies = items.map(item => getCategoryUrl(item, items));
    return {paths: hierachies.map(hierachy => ({params: {hierachy}})), fallback: false};
  },
  props: async ({params}) => {
    const items = await fetchCollection(collectionName);
    const slug = params.hierachy.reverse()[0];
    const item = items.find(item => encodeSlug(item.title) === slug);
    const children = items
      .filter(t => t.category?._id === item._id)
      .map(t => ({
        slug: encodeSlug(t.title),
        title: t.title
      }));
    const parents = [];
    let movingItem = item;
    while (movingItem.category?._id) {
      movingItem = items.find(t => t._id === movingItem.category._id);
      parents.unshift({name: movingItem.title, segments: getCategoryUrl(movingItem, items)})
    }
    return {props: {cockpitHost, item, children, parents}}
  }
});

export const getCategoryUrl = (item, items) => [...(item.category ? getCategoryUrl(items.find(t => t._id === item.category._id), items) : []), encodeSlug(item.title)];
export default system;