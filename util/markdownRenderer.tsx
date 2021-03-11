import React from "react";

export const renderer = {
  strong: value => (
    <span
      className="font-bold text-secondary-default"
  children={value.children}
  />
),
  link: value => (
    <a href={value.href} className="text-blue-600 underline hover:no-underline">{value.children}</a>),
  image: value => (
    <img className="rounded border-primary-400 border m-2 max-h-80" src={value.src} />),
  paragraph: value => (
    <div className="py-2" children={value.children} />),
  emphasis: value => (
    <span className="italic" children={value.children} />),
  blockquote: value => (
    <div className="italic border-l-4 pl-4 my-2 border-secondary-default opacity-90 md:-mx-6 md:text-lg" children={value.children} />),
  list: value => value.ordered ? <ol className="list-decimal pl-6 my-2">{value.children}</ol> : <ul className="list-disc pl-6 my-2">{value.children}</ul>,
  heading: args => {
    return (
      <div className={["", "text-xl mt-1 mb-2","text-lg mt-1 mb-2 underline"][args.level]} children={args.children}/>);
  }
}