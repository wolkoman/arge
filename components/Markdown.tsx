import React from "react";
import ReactMarkdown from 'react-markdown';

export default function Markdown({children}) {
  return <ReactMarkdown renderers={renderer} children={children} allowDangerousHtml={true}/>
}

const renderer = {
  strong: value => (
    <span
      className="font-bold text-secondary-default"
      children={value.children}
    />
  ),
  link: value => (
    <a href={value.href} className="text-primary-500 underline hover:no-underline">{value.children}</a>),
  image(value) {
    if(value.src.match("[^\|]*#([^\|]*)")){
      const parts = value.src.split('#');
      return <a href={parts[1]}><img className="rounded border-primary-400 border m-2 max-w-md w-full" src={parts[0]}/></a>;
    }
    return <img className="rounded border-primary-400 border m-2 max-w-md w-full" src={value.src}/>;
  },
  paragraph: value => (
    <div className="py-2" children={value.children} />),
  code(value) {
    if(value?.language?.match("link=(.*)")){
      const link = value.language.match("link=(.*)")[0];
      return <a href={link}>
        <Markdown children={value.value}/>
      </a>;
    }
    return null;
  },
  emphasis: value => (
    <span className="italic" children={value.children} />),
  blockquote: value => (
    <div className="italic border-l-4 pl-4 my-2 border-secondary-default opacity-90 md:-mx-6 md:text-lg" children={value.children} />),
  list: value => value.ordered ? <ol className="list-decimal pl-6 my-2">{value.children}</ol> : <ul className="list-disc pl-6 my-2">{value.children}</ul>,
  heading: args => {
    return (
      <div className={["", "text-xl mt-1 mb-2","text-lg mt-1 mb-2 underline"][args.level]} children={args.children}/>);
  },
}