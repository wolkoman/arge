import Link from 'next/link';
import React from 'react';
import {Site} from '../../components/Site';
import {cockpitHost, fetchCollection} from '../../util/cockpit';
import {encodeSlug} from '../../util/slug';
import ReactMarkdown from 'react-markdown';
import {renderer} from '../../util/markdownRenderer';
import {Breadcrums} from '../../components/Breadcrums';
import {useRouter} from 'next/router';

export default function Index({cockpitHost, topic, children, parents}) {
  const router = useRouter();
  return <Site>
    <Breadcrums crums={[{name: 'Themen', link: '/themen'}, ...parents.map(({name, segments}) => ({
      name,
      link: `/themen/${segments.join('/')}`
    })), {name: topic.title}]}/>
    <div className="text-5xl font-bold mb-6">{topic.title}</div>
    <div className="flex flex-col-reverse md:flex-row">
      {(children.length === 0 || topic.files?.length) ? null : <div style={{flex: 1}}>
        {children.length ?
          <div className="bg-white p-6 rounded-lg mr-6 mb-4">
            <div className="mb-1 font-bold">Unterseiten</div>
            {children.map(child => <Link href={`${router.asPath}/${child.slug}`} key={child.slug}>
              <div className="cursor-pointer underline hover:no-underline">{child.title}</div>
            </Link>)}
          </div> : null}
        {topic.files?.length ?
          <div className="bg-white p-6 rounded-lg mr-6">
            <div className="mb-1 font-bold">Downloads</div>
            {topic.files?.map(({value}) => <Link href={`${cockpitHost}/storage/uploads${value.path}`} key={value.path}>
              <div className="cursor-pointer underline hover:no-underline">{value.title}</div>
            </Link>)}
          </div> : null}
      </div>}
      <div style={{flex: 2}}>
        <ReactMarkdown renderers={renderer} children={topic.content}/>
      </div>
    </div>
  </Site>;
}

const getUrl = (topic, topics) => [...(topic.category ? getUrl(topics.find(t => t._id === topic.category._id), topics) : []), encodeSlug(topic.title)];

export async function getStaticPaths() {
  const topics = (await fetchCollection('topics'));
  const urls = topics.map(topic => getUrl(topic, topics));
  return {paths: urls.map(url => ({params: {thema: url}})), fallback: false};
}

export async function getStaticProps({params}) {
  const topics = await fetchCollection('topics');
  const slug = params.thema.reverse()[0];
  const topic = topics.find(topic => encodeSlug(topic.title) === slug);
  const children = topics
    .filter(t => t.category?._id === topic._id)
    .map(t => ({
      slug: encodeSlug(t.title),
      title: t.title
    }));
  const parents = [];
  let topicItem = topic;
  while (topicItem.category?._id) {
    topicItem = topics.find(t => t._id === topicItem.category._id);
    parents.unshift({name: topicItem.title, segments: getUrl(topicItem, topics)})
  }
  return {props: {cockpitHost, topic, children, parents}}
}