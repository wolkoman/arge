import React from 'react';
import {Site} from '../components/Site';
import {fetchSingleton} from '../util/cockpit';
import Markdown from '../components/Markdown';
import searchSite from "../util/search";
import {GetServerSidePropsContext} from "next";
import Link from "next/link";
import {getNews} from "../util/newsapi";

export default function Spenden({news}) {
    return <Site title="News">
        {news.articles.map(({title, description, url, publishedAt}: any) => <Link href={url} key={url}><div className="my-4">
            <div className="font-bold">{title} ({publishedAt})</div>
            <div>{description}</div>
        </div></Link>)}
    </Site>;
}

export async function getServerSideProps(){
    return {props:{
        news: await getNews()
    }}
}