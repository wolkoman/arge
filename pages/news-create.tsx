import React, {useState} from 'react';
import {Site} from '../components/Site';
import {fetchSingleton} from '../util/cockpit';
import Markdown from '../components/Markdown';
import searchSite from "../util/search";
import {GetServerSidePropsContext} from "next";
import Link from "next/link";
import {getNews} from "../util/newsapi";
import {getInstagramTitle} from "../util/chatgpt";

export default function Spenden({news}) {
    const [value, setValue] = useState("")
    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(false)
    async function ask() {
        setLoading(true)
        setResult(await fetch("/api/gpt", {method: "POST",headers: {"Content-Type": "application/json"}, body: JSON.stringify({value})}).then(x => x.json()))
        setLoading(false)
    }

    return <Site title="Create News">
        <textarea value={value} onChange={event => setValue(event.target.value)} >

        </textarea>
        <button onClick={ask} disabled={loading}>Ask</button>
        <div>
            {result}
        </div>
        <button onClick={ask} disabled={!loading}>Save</button>
    </Site>;
}