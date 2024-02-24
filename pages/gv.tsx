import Link from 'next/link';
import React from 'react';
import {Responsive} from '../components/Responsive';
import {Site} from '../components/Site';
import {cockpitHost, fetchCollection} from '../util/cockpit';
import {encodeSlug} from '../util/slug';
import {getCategoryUrl} from '../components/HierachyArticles';
import Markdown from '../components/Markdown';
import {manualArticles} from "./artikel/[slug]";

export default function Home() {
    return (
        <Site responsive={false} title="Generalversammlung 2024">
            <div className="relative z-20 min-h-md">
              <Responsive>
                <div className="text-3xl my-4 font-bold">Generalversammlung 2024</div>
                <div className="flex flex-col gap-2 my-4">
                  <div>Die Generalversammlung findet am 24.02.2024 um 10:00 Uhr statt.</div>
                  <div>Die Tagesordnung lautet:<br/>
                    1. Feststellen der Beschlussfähigkeit<br/>
                    2. Bericht des Vorstandes<br/>
                    3. Finanzbericht und Entlastung der Vorstandes<br/>
                    4. Wahl des Vorstandes<br/>
                    5. Anpassung der Statuten<br/>
                    6. Allfälliges
                  </div>
                  <div>Der Link zum Beitritt wird am Tag der Sitzung hier veröffentlicht:</div>

                </div>
                <Link href="https://meet.jit.si/argegeneralversammlung24">
                <div className="inline-block px-4 py-2 opacity-50 bg-primary-500 hover:bg-primary-400 text-white my-4 rounded-lg">
                  Beitritt zum Online Meeting
                </div>
                </Link>
              </Responsive>
            </div>
        </Site>
    );
}
