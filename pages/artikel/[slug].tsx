import {fetchCollection} from '../../util/cockpit';
import {encodeSlug} from '../../util/slug';
import {Site} from '../../components/Site';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import {renderer} from '../../util/markdownRenderer';
import {Breadcrums} from '../../components/Breadcrums';

export default function Article({article}) {
  return <Site>
    <Breadcrums crums={[{name: "Startseite", link: "/"}, {name: article.title, link: `/artikel/${encodeSlug(article.title)}`}]}/>
    <div className="text-5xl font-bold mb-6">{article.title}</div>
    <ReactMarkdown renderers={renderer} children={article.content}/>
  </Site>;
}

export async function getStaticPaths() {
  const articles = await fetchCollection('article');
  const slugs = articles.map(article => encodeSlug(article.title));
  return {paths: slugs.map(slug => ({params: {slug}})), fallback: false}
}

export async function getStaticProps({params: {slug}}) {
  const articles = await fetchCollection('article');
  const article = articles.find(a => encodeSlug(a.title) === slug);
  return {props: {article}}
}