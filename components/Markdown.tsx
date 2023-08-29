import React from "react";
import ReactMarkdown from 'react-markdown';
import {Gallery, Item} from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import Link from "next/link";

export default function Markdown({children}) {
  return <div className="text-lg">{ReactMarkdown({renderers: renderer, children, allowDangerousHtml: true}).props.children.map(mapObject)}</div>;
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
          <img ref={ref} onClick={open} src={source} className="rounded my-2 inline-block h-32 cursor-pointer"  />
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

const collectionLinkPrefix = "collection://";
const renderer = {
  strong: value => (
    <span
      className="font-bold text-secondary-default"
      children={value.children}
    />
  ),
  link: value => {
    let href = value.href
    if(value.href.startsWith(collectionLinkPrefix)) {
      href = `/collectionlink/${value.href.substring(collectionLinkPrefix.length)}`;
    }
    return (
      <Link href={href}><a className="text-primary-500 underline hover:no-underline">{value.children}</a></Link>);
  },
  image(value) {
    let size = 28;
    const src = value.src.replace("data.argeschoepfung.at", "data2.argeschoepfung.at");
    if(src.match("size=(\d*)")) {
      size = src.split("size=")[1];
    }
    if(src.match("size=full")) {
      size = null;
    }
    if(src.match("[^\|]*#([^\|]*)")){
      const parts = src.split('#');
      return <a href={parts[1]}><img className="rounded  my-2 w-full" src={parts[0]} style={size ? { maxWidth: `${size}rem` } : {}}/></a>;
    }
    return <img className="rounded  my-2 w-full" src={src} style={size ? { maxWidth: `${size}rem` } : {}}/>;
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
    <div className="text-center font-serif italic px-6 py-2 my-6 rounded-lg relative">
      <div className="absolute -top-4 -left-4 text-8xl text-primary-500" children={"“"}/>
      <div className="absolute -bottom-4 -right-4 text-8xl text-primary-500" children={"„"}/>
      {value.children}
    </div>),
  list: value => value.ordered ? <ol className="list-decimal pl-6 my-2">{value.children}</ol> : <ul className="list-disc pl-6 my-2">{value.children}</ul>,
  heading: args => {
    return (
      <div className={["", "text-4xl mt-4 mb-8","text-2xl mt-4 mb-1 underline"][args.level]} children={args.children}/>);
  },
}