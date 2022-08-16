import React from 'react';
import {Site} from '../components/Site';
import {fetchSingleton} from '../util/cockpit';
import Markdown from '../components/Markdown';
import searchSite from "../util/search";
import {GetServerSidePropsContext} from "next";
import Link from "next/link";

export default function Spenden({results, searchTerm}) {
    return <Site title="Spenden">
        <div className="my-4">
            <div className="text-xl">Sucherergebnisse für</div>
            <div className="text-4xl tracking-wider text-secondary-default font-bold">{searchTerm}</div>
        </div>
        <div className="flex flex-col space-y-4">
        {results.map(result => <Link href={result.url} key={result.url}><div className="bg-white rounded-lg px-6 py-3 cursor-pointer">
            <div className="text-lg font-bold">{result.title}</div>
            <div>
                {result.preview}
            </div>
        </div></Link>)}
        </div>
    </Site>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const searchTerm = context.query.q;
    return searchTerm ? {props: {results: await searchSite(searchTerm), searchTerm}} : {redirect: {permanent: false, destination: "/"}}
}