import Link from 'next/link'
import React from 'react'

export interface Crum{ name: string, link?: string }
export const Breadcrums = ({crums}: { crums: Crum[] }) => {
  return (
    <div className="flex flex-row opacity-70 mb-2">
      {crums
        .filter(crum => crum.name)
        .map((crum, i) => crum.link
        ? <Link key={crum.link} href={crum.link} children={<div><Crum name={crum.name} arrow={i !== 0} hoverable={true}/></div>}/>
        : <Crum key={crum.link} name={crum.name} arrow={i !== 0}/>)}
    </div>
  );
};

const Crum = ({name, arrow, hoverable}: { name: string, arrow: boolean, hoverable?: boolean }) => <div className="flex flex-row">
  <div>{arrow ? <div className="mr-3">
    <div className="border-t-2 border-r-2 border-gray-600 w-2 h-2 transform rotate-45 mt-3"></div>
  </div> : null}</div>
  <div className={`mr-2 py-1 px-2 rounded ${hoverable ? 'hover:bg-white cursor-pointer' : ''}`}>{name}</div>
</div>