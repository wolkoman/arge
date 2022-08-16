import {NextApiRequest, NextApiResponse} from "next";
import {fetchCockpit} from "./cockpit";
import {getCategoryUrl} from "../components/HierachyArticles";

export default async function searchSite(term): Promise<{title: string, score: number, preview: string, url: string}[]> {

    const searchTerm = term.toLowerCase();

    const {entries:topics} = await fetchCockpit("collections", "topics");
    const {entries:ueberuns} = await fetchCockpit("collections", "ueberuns");
    const relevant = [
        ...topics.filter(entry => entry.content.toLowerCase().includes(searchTerm) || entry.title.toLowerCase().includes(searchTerm)).map(x => ({...x, origin: "themen"})),
        ...ueberuns.filter(entry => entry.content.toLowerCase().includes(searchTerm) || entry.title.toLowerCase().includes(searchTerm)).map(x => ({...x, origin: "ueber-uns"})),
    ];

    const results = relevant.map(entry => {
        const contentScore = entry.content.toLowerCase().split(searchTerm).length - 1;
        const titleScore = entry.title.toLowerCase().split(searchTerm).length - 1;
        const firstOccurrence = entry.content.toLowerCase().indexOf(searchTerm);
        const previewSize = 100;
        const preview = entry.content.slice(Math.max(0, firstOccurrence - previewSize), Math.min(entry.content.length, firstOccurrence + previewSize));
        return ({
            title: entry.title,
            score: contentScore + titleScore * 10,
            preview,
            url: "/"+entry.origin+"/" + getCategoryUrl(entry, entry.origin === "themen" ? topics: ueberuns).join("/")
        });
    }).sort((a, b) => b.score - a.score);

    return results;
}