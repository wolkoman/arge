import React from "react";
import ReactMarkdown from 'react-markdown';
import {Gallery, Item} from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

export default function Markdown({children}) {
  return <>{ReactMarkdown({renderers: renderer, children, allowDangerousHtml: true}).props.children.map(mapObject)}</>;
}

const mapObject = (object) => {
  return {
    ...object,
    props: mapProps(object.props)
  };
}
const mapProps = (props) => {
  return {
    ...props,
    children: mapChildren(props.children)
  };
}
const mapChildren = (children) => {
  if(Array.isArray(children) && children.length > 1 && children.every(isPartOfGallery)) {
    const imageSources = children.filter(isImageElement).map(imageElement => imageElement.props.src);
    return <Gallery>
      {imageSources.map(source =><Item
        key={source}
        original={source}
        thumbnail={source}
        width="1000"
        height="1000"
      >
        {({ ref, open }) => (
          <>
          { /* @ts-ignore */ }
          <img ref={ref} onClick={open} src={source} className="rounded border-primary-500 border m-2 inline-block h-32 cursor-pointer"  />
          </>
        )}
      </Item>)}
    </Gallery>;
  }else if(Array.isArray(children)) {
    return children.map(mapObject);
  } else {
    return children;
  }
}

function isImageElement(object) {
  return !!object.props.src;
}

function isLineBreakElement(object) {
  return object.props.value === '\n';
}

const isPartOfGallery = (object) => {
  return isImageElement(object) || isLineBreakElement(object);
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
    let size = 28;
    if(value.src.match("size=(\d*)")) {
      size = value.src.split("size=")[1];
    }
    if(value.src.match("[^\|]*#([^\|]*)")){
      const parts = value.src.split('#');
      return <a href={parts[1]}><img className="rounded border-primary-500 border m-2 w-full" src={parts[0]} style={{ maxWidth: `${size}rem` }}/></a>;
    }
    return <img className="rounded border-primary-500 border m-2 w-full" src={value.src} style={{ maxWidth: `${size}rem` }}/>;
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