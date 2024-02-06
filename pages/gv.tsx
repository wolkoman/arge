import Link from 'next/link';
import React from 'react';
import {Responsive} from '../components/Responsive';
import {Site} from '../components/Site';
import {cockpitHost, fetchCollection} from '../util/cockpit';
import {encodeSlug} from '../util/slug';
import {getCategoryUrl} from '../components/HierachyArticles';
import Markdown from '../components/Markdown';
import {manualArticles} from "./artikel/[slug]";

export default function Home({articles, topics, news}) {
    return (
        <Site responsive={false} title="Generalversammlung 2024">
            <div className="relative z-20 min-h-md">
                <Responsive>
                    <div className="text-3xl my-4 font-bold">Generalversammlung 2024</div>
                    <div>Der Link zum Beitritt wird rechtzeitig hier veröffentlicht.</div>

                  <div className="inline-block cursor-not-allowed px-4 py-2 opacity-50 bg-primary-500 text-white my-4 rounded-lg">Beitritt zum Online Meeting</div>
                </Responsive>
            </div>
        </Site>
    );
}
