import {useRouter} from 'next/router';
import {Site} from './Site';
import {Breadcrums, Crum} from './Breadcrums';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import {renderer} from '../util/markdownRenderer';
import React from 'react';

export function ExtendedLayout({crums, title, files, subsites, content, cockpitHost}:{crums: Crum[], title: string, files: any[], subsites: any[], content, cockpitHost: string})  {
  const router = useRouter();
  return <Site>
    <Breadcrums crums={crums}/>
    <div className="text-5xl font-bold mb-6 text-primary-500">{title}</div>
    <div className="flex flex-col-reverse md:flex-row">
      {(subsites.length == 0 && (files?.length == 0 || files == undefined)) ? null :
        <div style={{flex: 1}}>
          {subsites.length == 0 ? null :
            <Container title="Unterseiten">
            {subsites.map(child =>
              <Link href={`${router.asPath}/${child.slug}`} key={child.slug}>
                <div className="cursor-pointer underline hover:no-underline text-blue-600 my-2">
                  {child.title}
                </div>
              </Link>
            )}
          </Container>}
          {!files?.length ? null :
          <Container title="Downloads">
            {files?.map(({value}) => value?.path ?
              <Link href={`${cockpitHost}/storage/uploads${value?.path}`} key={value?.path}>
                <div className="cursor-pointer underline hover:no-underline text-blue-600 my-2">{value?.title}</div>
              </Link> : <div>Leerer Download</div>)}
          </Container>}
        </div>}
      <div style={{flex: 2}}>
        <ReactMarkdown renderers={renderer} children={content}/>
      </div>
    </div>
  </Site>;
}

function Container({children, title}:{children: React.ReactNode, title: string}){
  return  <div className="bg-white p-6 rounded-lg mr-6 mb-4">
      <div className="mb-1 font-bold">{title}</div>
      {children}
    </div>;
}