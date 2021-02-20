import React from "react";

export const renderer = {
  strong: value => (
    <span
      className="font-bold text-pink-600"
  children={value.children}
  />
),
  image: value => (
    <img className="rounded border-primary-400 border m-2 max-h-80" src={value.src} />),
  paragraph: value => (
    <div className="py-2" children={value.children} />),
  emphasis: value => (
    <span className="italic" children={value.children} />),
  heading: args => {
    return (
      <div className={["", "text-xl mt-1 mb-2","text-lg mt-1 mb-2 underline"][args.level]} children={args.children}/>);
  }
}