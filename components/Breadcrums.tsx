import Link from 'next/link'
import React from 'react'

export const Breadcrums = ({crums}: { crums: { name: string, link?: string }[] }) => {
  return (
    <div className="flex flex-row opacity-70 mb-2">
      {crums.map((crum, i) => crum.link
        ? <Link href={crum.link} children={<div><Crum name={crum.name} arrow={i !== 0}/></div>}/>
        : <Crum name={crum.name} arrow={i !== 0}/>)}
    </div>
  );
};

const Crum = ({name, arrow}: { name: string, arrow: boolean }) => <div className="flex flex-row">
  <div>{arrow ? <div className="mr-3">
    <div className="border-t-2 border-r-2 border-gray-600 w-2 h-2 transform rotate-45 mt-3"></div>
  </div> : null}</div>
  <div className="cursor-pointer mr-2 hover:bg-white py-1 px-2 rounded">{name}</div>
</div>