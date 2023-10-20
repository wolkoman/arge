import {fetchCollection} from '../../util/cockpit';
import {encodeSlug} from '../../util/slug';
import {Site} from '../../components/Site';
import React from 'react';
import {Breadcrums} from '../../components/Breadcrums';
import Markdown from '../../components/Markdown';

export default function Article({article}) {
  return <Site title={article.title}>
    <Breadcrums crums={[{name: "Startseite", link: "/"}, {name: article.title, link: `/artikel/${encodeSlug(article.title)}`}]}/>
    <div className="text-5xl font-bold mb-6 text-primary-500">{article.title}</div>
    <Markdown children={article.content[0].value}/>
  </Site>;
}

export async function getStaticPaths() {
  const articles = [...await fetchCollection('article'), ...manualArticles];
  const slugs = articles.map(article => encodeSlug(article.title));
  return {paths: slugs.map(slug => ({params: {slug}})), fallback: false}
}

export async function getStaticProps({params: {slug}}) {
  const articles = [...await fetchCollection('article'), ...manualArticles];
  const article = articles.find(a => encodeSlug(a.title) === slug);
  return {props: {article}, revalidate: 1}
}

export const manualArticles = [
  {
    title: "Fernwärme als Schlüssel zur Energiewende: Wiens Pionierprojekt",
    content: [{
        field: {name: "content"},
      value: `    Die nächste Heizperiode steht bevor. Infos zum Energiesparen.

Dieser Artikel beschreibt ein Projekt von Wien Energie zum beschleunigten Ausbau von Fernwärme in 4 Pilotgebieten in Wien, um den Ausstieg aus Gas zu ermöglichen. Die 4 Gebiete wurden auf Basis der Wärmebedarfsdichte und anderer Faktoren ausgewählt. Bis 2026 soll in über 200 Gebäuden der Anschluss an das Fernwärmenetz vorbereitet werden. Das Projekt zielt darauf ab, wichtige Erkenntnisse für die weitere Umstellung auf klimafreundliche Heizsysteme zu gewinnen.

[Fernwärme-Ausbau Wien: Raus aus Gas in 4 Pioniergebieten](https://positionen.wienenergie.at/projekte/waerme-kalte/pioniergebiete-fernwaerme-ausbau/)

In diesem Szenario gewinnt Elektrizität zunehmend an Bedeutung und wird die wichtigste Energiequelle, da sie nach und nach fossile Energien ersetzt. Besonders deutlich wird dies im Transportsektor, in dem der Anteil fossiler Energien von überwiegend 2030 auf nur noch einen Bruchteil 2050 sinkt. Auch im Gebäudesektor wird mehr elektrifiziert, muss aber auch deutlich Energie eingespart werden durch Sanierungen. In der Industrie und im Transportsektor spielt Wasserstoff eine wichtige Rolle.

[Energieverbrauch weltweit nach Sektoren » Entwicklung bis 2050](https://positionen.wienenergie.at/grafiken/sektoraler-energieverbrauch-im-netto-null-szenario/?utm_source=mailpoet&utm_medium=email&utm_campaign=energiepolitisches-update_21)

[Tiefe Geothermie » Potential &amp; Zukunftsaussichten | Positionen](https://positionen.wienenergie.at/themen/waermewende/geothermie/)

[Großwärmepumpen » Zukunftsweisende Technologie | Positionen](https://positionen.wienenergie.at/projekte/waerme-kalte/grosswaermepumpe/)

[Infografik: Wärmepumpen boomen | Statista](https://de.statista.com/infografik/29432/anteil-der-waermepumpen-im-wohngebaeude-neubau-in-deutschland/?utm_source=Statista+Newsletters&utm_campaign=c2408728be-All_InfographTicker_daily_DE_AM_KW37_2023_Mo&utm_medium=email&utm_term=0_662f7ed75e-c2408728be-348811470)

[Energieeffizienzgesetz neu » Österreich beschließt Novelle](https://positionen.wienenergie.at/blog/energieeffizienzgesetz-beschlossen/?utm_source=mailpoet&utm_medium=email&utm_campaign=energiepolitisches-update_21)

Im Mai 2023 wurde ein wichtiger Meilenstein für erneuerbare Energie erreicht: Das erste Mal wurde in der Europäischen Union mehr Strom aus Solar- und Windkraft erzeugt als aus fossilen Brennstoffen.

[Wind and solar overtake fossil generation in the EU | Ember](https://ember-climate.org/press-releases/wind-and-solar-overtake-fossil-generation-in-the-eu/)

[Infografik: Erneuerbare Energie: 2023 überstrahlt das Vorjahr | Statista](https://de.statista.com/infografik/27643/anteil-von-solar-und-wind-an-der-nettostromerzeugung-in-deutschland/?utm_source=Statista+Newsletters&utm_campaign=06759db03d-All_InfographTicker_daily_DE_AM_KW29_2023_Di&utm_medium=email&utm_term=0_662f7ed75e-06759db03d-348811470)
    
`
    }],
    slug: "fernwärme-wien",
    preview: "Wien steuert auf eine grünere Zukunft zu – entdecken Sie, wie 4 ausgewählte Gebiete den Wandel vorantreiben und warum Elektrizität und Wasserstoff bald die Hauptrolle spielen könnten",
    image: {
      path: "/storage/uploads/2023/10/19/Radiator_uid_6531522d7a649.jpg"
    },
    hidden: false,
  },
    {
        title: "Das zukunftsweisende Solarhaus, das sich der Sonne anpasst",
        content: [{
            field: {name: "content"},
            value: `# Ein passives Solarhaus

Da die Kosten für Heizöl, Gas, Strom und Holz in die Höhe schnellen, wäre es an der Zeit, weniger energieintensive Gebäude zu bauen, anstatt daran zu denken, seinen Verbrauch zu senken. Der gelernte Tischler Eric Wasser hat 2010 den Bau seines Heliodomes vollendet. Die Heliodome ist ein bioklimatischen Solarhaus gebaut in Cosswiller im Elsass. Es sieht es aus wie ein Kreisel. Auf der einen Seite befindet sich ein großes Glasdach und auf der anderen Seite ein Holzdach mit Oberlichtern und einer Terrasse. Das Solarhaus hat eine Höhe von etwa 10 Metern. Das Haus ist als eine riesige Sonnenuhr und steht in einem festen Winkel in Bezug auf die Bewegungen der Sonne. Lichtundurchlässige Außenflächen an jenen Stellen des Hauses, auf die die Sonnenstrahlen während der Sommermonate fallen, spenden Schatten, um eine kühle Innentemperatur zu halten. Im Winter und Frühjahr dagegen, dringt die Sonne durch die großen Fenster ein und wärmt den Wohnraum.

Das Solarhaus ist überhaupt nicht energieintensiv. Dank seiner Struktur, Ausrichtung und Isolierung ist die Temperatur nahezu konstant. Ist eine Wohnung, die so konzipiert ist, dass sie die Sonneneinstrahlung optimal nutzt, dank seines Designs (Form, Orientierung, Verteilung der Öffnungen, Isolierung, thermische Trägheit…), der Qualität der Komponenten (Mauern, Dach, Sol, Fenster und Türen ...) und einer leistungsstarken Belüftung, um Luftzufuhr und Feuchtigkeit zu regeln.

Eric Wasser wollte, dass sich sein Bau an die Bahnen der Sonne anpasst. 1992 fand er ein Buch, das die Winkel der Sonneneinstrahlung zu jeder Stunde des Tages über ein Jahr hinweg angab. Im Sommer steht die Sonne viel höher und kommt nicht rein, da ihre Strahlen vor allem auf die lichtundurchlässigen Teile des Hauses fallen. Das ist vier Monate lang der Fall. Während vier weiteren steht sie tief. dann scheinen die Sonnenstrahlen direkt in die Glasfenster und erwärmen das Haus. Und zweimal im Jahr wechselt sie für zwei Monate von der Sommer- in die Winterposition oder umgekehrt. Die Patentanmeldung erfolgte im Jahr 2000. In Deutschland erfüllt ein Heliodome die Anforderungen des Etiketts “Passivhaus”, das sind Gebäude mit weniger als 15 kWh / m² Heizenergieverbrauch pro Jahr.

Adresse: Heliodome, 10 Rue Diebach, F-67310 Cosswiller.

Tel/Fax 03 88 87 09 66. [contact@heliodome.com](mailto:contact@heliodome.com)

Eric Wasser plant die Vermarktung als Bausatz oder die schlüsselfertige Lieferung verschiedener Modelle, von denen einige für die Errichtung kleiner Zusatzgebäude (Ferienhäuser, Bungalows, Studios im Garten) geeignet sind. Wegen des von der Sonnenbestrahlung des Bauplatzes bestimmten Winkels steht die Anpassung der Höhe des Gebäudes in einem Verhältnis zur Grundfläche und der Anzahl der Stockwerke. So kann man bei einer Höhe von sechs Metern 40 m² Wohnfläche, bei zehn Metern 160 m² oder bei 15 Metern sogar 600 m² Wohnfläche erreichen.

Ein Dutzend Bauten mit denselben Prinzipien sind entstanden in der Schweiz, Deutschland und im Osten Frankreichs. Etwa 20 Projekte sind in Arbeit. 2012-13 entstand das Héliodome von Herbert Lotscher und seiner Frau Gabri mit Blick auf den Dent Blanche in der Schweiz.

Quellen:

http://www.bubblemania.fr/de/eric-wasser-heliodome-maison-solaire/

https://www.20minutes.fr/planete/4002100-20220925-alsace-quoi-maison-epouse-trajectoires-soleil

https://www.batiactu.com/edito/heliodome-un-espace-sculpte-par-le-soleil-37973.php`
        }],
        slug: "helidome",
        preview: "Entdecken Sie das revolutionäre Design des Heliodomes - ein Haus, das sich an die Bahnen der Sonne anpasst, Energie spart und zeigt, wie die Architektur der Zukunft aussehen könnte.",
        image: {
            path: "/storage/uploads/2023/10/20/helidome_uid_6531da1b190ae.jpeg"
        },
        hidden: false,
    },
    {
        title: "Schöpfungszeit in Wien: Vereinte Kloster-Gemeinschaften im Zeichen der Umwelt",
        content: [{
            field: {name: "content"},
            value: `Schon 2022 haben die Franziskaner in Wien zum Weltgebetstag für die Bewahrung der Schöpfung in den Garten ihres Klosters eingeladen. Denn der heilige Franziskus forderte, immer einen Teil des Gartens unbebaut zu lassen, damit dort die wilden Kräuter wüchsen und die, welche sie bewunderten, ihren Blick zu Gott, dem Schöpfer solcher Schönheit erheben könnten (LS 12). Für 2023 organisierte P. Josef Hofbauer OFM vom 31. August bis zum 2. September drei Schöpfungstage im Garten des Franziskanerklosters. In diesem Jahr waren sie erstmals eingebunden in einen Veranstaltungskalender, den drei Männerklöster im 1. Wiener Gemeindebezirk gemeinsam erstellt haben. Benediktiner, Dominikaner und Franziskaner haben ihre Angebote zur SchöpfungsZeit gebündelt.

![](https://data2.argeschoepfung.at/storage/uploads/2023/10/20/orden1_uid_6531db48b515c.jpg)
*1. Dr. Felix GRADL OFM bei seinem Vortrag im Garten des Franziskanerklosters*

Am 31. August hielt Felix Gradl OFM einen Vortrag zum Thema Schöpfung und das Miteinander der Völker im Alten Testament. Darin betonte er: Der *Adam* ist von der ’adama genommen, er ist für die *’adama* bestellt und er kehrt wieder zur *’adama* zurück. Denn gemäß Gen 2,7 töpfert Gott den Menschen *ha-’adam*, d.h. jeden Menschen, Mann und Frau, aus dem Staub von der Erde – Erde ist im Hebräischen *’adama*. Auch die Tiere des Feldes und die Vögel des Himmels töpfert Gott aus der *’adama*. Der wesentliche Unterschied zum Menschen besteht freilich darin, dass der Mensch sein Leben unmittelbar von Gott hat, was bei den Tieren ausgespart bleibt. Weiter heißt es in Gen 2,15, der Adam solle den Erdboden – *’adama* – bedienen und schützen. Und schlussendlich schließt sich der Kreis: der Mensch kehrt wieder zur Erde zurück (Gen 3,19).

Am 1. September gab es im Garten des Franziskanerklosters Anregungen zum schöpfungsgerechten Leben von P. Elias M. Van Haaren OFM und gleichzeitig die erste der wöchentlichen Abendmessen zur SchöpfungsZeit am Freitag in der Dominikanerkirche, zelebriert von P. Hans Ulrich Steymans OP.

![](https://data2.argeschoepfung.at/storage/uploads/2023/10/20/orden2_uid_6531db49b6f59.jpg)
*Das von Oeku (Ökumenischer Verein Umwelt und Kirche) gestaltete Banner für die SchöpfungsZeit neben der Kanzel der Dominikanerkirche.*

Am 2. September feierten P. Sandesh Manuel OFM und P. Josef Hofbauer OFM eine Abendmesse unter dem Motto Die Schöpfung mein/unser Lebensraum.

![](https://data2.argeschoepfung.at/storage/uploads/2023/10/20/orden3_uid_6531db4ae8c59.jpg)
*1. Sandesh und P. Josef bei der Abendmesse im Garten des Franziskanerklosters*

Am 30. September feierte P. Georg Braulik OSB in der Schottenkirche einen Gottesdienst zum Ausdruck der festlichen Freude vor Gott anlässlich des christlichen Erntedanksonntags und den ersten Tag des jüdischen Laubhüttenfests, die in diesem Jahr auf dasselbe Datum fielen.

![](https://data2.argeschoepfung.at/storage/uploads/2023/10/20/orden4_uid_6531de762c112.jpg)
1. Prof. em. DDr. Georg Braulik OSB während des Luzernars.

In seiner Predigt beleuchtete Pater Georg Braulik OSB die Vorschriften zum Laubhüttenfest im Deuteronomium. Das Tätigkeitswort sich freuen wird im Deuteronomium nur im Zusammenhang des Gottesdienstes verwendet. Der eigentliche Ort der Freude ist also die Liturgie vor Gott. In den Freudenmählern des Laubhüttenfestes sollten die Bäuerinnen und Bauern Israels während sieben Tagen den zehnten Teil der Jahresente und die Erstgeburten von Rind, Ziege und Schaf des Jahres verspeisen. Leibhaft wurde im fröhlichen Essen und Trinken der Segen des Schöpfergottes erfahren und mit den landlosen Mitgliedern der Gesellschaft, den Leviten, den Fremden, Waisen und Witwen des Dorfes oder Stadtviertels geteilt. Der geteilte Segen des Schöpfergottes verwirklicht ein Gottesvolk, das als Familie Gottes zusammenhält.

Weitere Veranstaltungen der SchöpfungsZeit waren ein Lesekreis des nachsynodalen Schreibens Querida Amazonia im Thomassaal des Dominikanerklosters und die Teilnahme von Ordensleuten beim Klimastreik im Rahmen von „Religions for Future“ am 15. September. Nach dem Auftakt im Innenhof der Armenisch-apostolischen Kirche, bei dem unter anderem der Abt des Schottenstifts, Nikolaus Poch OSB, unterstützt von Schülerinnen und Schülern des Schottengymnasiums ein Grußwort sprach ging es zur Demo vom Bahnhof Wien Mitte bis vor das Parlament. Den Abschluss bildete ein Schöpfungsgottesdienst des Ökumenischen Rates der Kirchen in der Michaelerkirche.

Außerhalb von Wien organisierte Pater Dr. Franz Helm SVD eine Reihe von Gottesdiensten und Veranstaltungen, zu denen die Steyler Missionare in St. Gabriel einluden. Dazu gehörten eine Heilige Messe zum Beginn der SchöpfungsZeit mit dem Primizsegen von Pater Lukas Hanúsek SVD am 1. September und der von Pater Georg Ziselsberger SVD gestaltete Wortgottesdienst zum Abschluss der SchöpfungsZeit.

Stifte und Klöster, die 2024 Gottesdienste und Veranstaltungen zur Feier der SchöpfungsZeit planen werden gebeten, diese der Plattform Schöpfungsverantwortung mitzuteilen, damit sich der Kreis der Ordensleute, die miteinander verbunden die SchöpfungsZeit feiern, sich ausdehnt.`
        }],
        slug: "helidome",
        preview: "Die Klöster von Wien vereinen sich in einem Veranstaltungskalender, um die Schöpfung zu ehren und das Bewusstsein für unsere Verantwortung als Hüter der Erde zu stärken. Benediktiner, Dominikaner, Franziskaner und mehr zeigen den Weg.",
        image: {
            path: "/storage/uploads/2023/10/20/orden1_uid_6531db48b515c.jpg"
        },
        hidden: false,
    }
]