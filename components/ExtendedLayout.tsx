import {useRouter} from 'next/router';
import {Site} from './Site';
import {Breadcrums, Crum} from './Breadcrums';
import Link from 'next/link';
import React from 'react';
import Markdown from './Markdown';
import {Responsive} from "./Responsive";


export function ExtendedLayout(props: { crums: Crum[], title: string, files: any[], subsites: any[], content, cockpitHost: string }) {
    return <Site title={props.title} responsive={false}>
        <Responsive wide={true}>
            <div className="grid lg:grid-cols-[260px_1fr_260px] gap-4 max-w-full">
                <div/>
                <div className="my-10">
                    <Breadcrums crums={props.crums}/>
                    <div className="text-6xl font-bold">{props.title}</div>
                </div>
                <div/>
                <div className="hidden lg:block">
                    <SubsiteContainer subsites={props.subsites}/>
                </div>
                <div>
                    <Markdown children={props.content}/>
                </div>
                <div>
                    <FileContainer files={props.files} cockpitHost={props.cockpitHost}/>
                </div>
                <div className="lg:hidden">
                    <SubsiteContainer subsites={props.subsites}/>
                </div>
            </div>

        </Responsive>
    </Site>;
}

function SubsiteContainer(props: { subsites: any[] }) {
    const router = useRouter();
    return <>
        {props.subsites.length == 0 ||
            <Container title="Unterseiten">
                {props.subsites.sort((a, b) => a.priority - b.priority).map(child =>
                    <Link href={`${router.asPath}/${child.slug}`} key={child.slug}>
                        <div
                            className="cursor-pointer underline hover:no-underline  my-2">
                            {child.title}
                        </div>
                    </Link>
                )}
            </Container>}
    </>;
}

function FileContainer(props: { files: any[], cockpitHost: string }) {
    return <>
        {!props.files?.length ? null :
            <Container title="Downloads">
                {props.files?.map(({value}) => value?.path ?
                    <Link href={`${props.cockpitHost}/storage/uploads${value?.path}`} key={value?.path}>
                        <div
                            className="cursor-pointer underline hover:no-underline my-2">{value?.title}</div>
                    </Link> : <div>Leerer Download</div>)}
            </Container>}
    </>;
}

function Container({children, title}: { children: React.ReactNode, title: string }) {
    return <div className="bg-white/50 p-6 rounded-lg mb-4">
        <div className="mb-1 font-bold">{title}</div>
        {children}
    </div>;
}