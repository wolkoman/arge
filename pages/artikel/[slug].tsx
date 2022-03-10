import {fetchCollection} from '../../util/cockpit';
import {encodeSlug} from '../../util/slug';
import {Site} from '../../components/Site';
import React from 'react';
import {Breadcrums} from '../../components/Breadcrums';
import Markdown from '../../components/Markdown';

export default function Article({article}) {
  return <Site title={article.title}>
    <Breadcrums crums={[{name: "Startseite", link: "/"}, {name: article.title, link: `/artikel/${encodeSlug(article.title)}`}]}/>
    <div className="text-5xl font-bold mb-6 text-primary-500">{article.title}</div>
    <Markdown children={article.content[0].value}/>
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
  return {props: {article}, revalidate: 1}
}