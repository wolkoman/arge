import Link from 'next/link';
import React from 'react';
import {Site} from '../../components/Site';
import {cockpitHost, fetchCollection} from '../../util/cockpit';
import {encodeSlug} from '../../util/slug';
import ReactMarkdown from 'react-markdown';
import {renderer} from '../../util/markdownRenderer';

export default function Index({cockpitHost, topic, children}) {
  return <Site>
    <div className="text-5xl font-bold mb-6">{topic.title}</div>
    <div className="flex flex-col-reverse md:flex-row">
      {children.length === 0 ? null : <div style={{flex: 1}}>
        <div className="bg-white p-2 rounded mr-2">
          <div className="mb-1 font-bold">Unterseiten</div>
          {children.map(child => <Link href={`${encodeSlug(topic.title)}/${child.slug}`} key={child.slug}>
            <div className="cursor-pointer">- {child.title}</div>
          </Link>)}
        </div>
      </div>}
      <div style={{flex: 3}}>
        <ReactMarkdown renderers={renderer} children={topic.content}/>
      </div>
    </div>
  </Site>;
}

export async function getStaticPaths() {
  const topics = (await fetchCollection('topics'));
  const getUrl = (topic) => [...(topic.category ? getUrl(topics.find(t => t._id === topic.category._id)) : []), encodeSlug(topic.title)];
  const urls = topics.map(topic => getUrl(topic));
  return {paths: urls.map(url => ({params: {thema: url}})), fallback: false};
}

export async function getStaticProps({params}) {
  const topics = await fetchCollection('topics');
  const slug = params.thema.reverse()[0];
  const topic = topics.find(topic => encodeSlug(topic.title) === slug);
  const children = topics.filter(t => t.category?._id === topic._id).map(t => ({
    slug: encodeSlug(t.title),
    title: t.title
  }));
  return {props: {cockpitHost, topic, children}}
}