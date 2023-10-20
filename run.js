const https = require('https');

function getTitleFromUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                // Use regex to extract title
                const titleMatch = /<title>([^<]+)<\/title>/i.exec(data);
                if (titleMatch && titleMatch[1]) {
                    resolve(titleMatch[1]);
                } else {
                    resolve("No Title");
                }
            });

        }).on('error', (e) => {
            reject(e);
        });
    });
}

async function replaceWithMarkdownLinks(text) {
    const urlRegex = /https?:\/\/[^\s]+/g;
    let urls = text.match(urlRegex);

    if (!urls) return text;

    for (let url of urls) {
        try {
            let title = await getTitleFromUrl(url);
            text = text.replace(url, `[${title}](${url})`);
        } catch (e) {
            console.error(`Error fetching title for ${url}: `, e);
        }
    }

    return text;
}

// Example
const inputText = "\n    Die nächste Heizperiode steht bevor. Infos zum Energiesparen.\n\nDieser Artikel beschreibt ein Projekt von Wien Energie zum beschleunigten Ausbau von Fernwärme in 4 Pilotgebieten in Wien, um den Ausstieg aus Gas zu ermöglichen. Die 4 Gebiete wurden auf Basis der Wärmebedarfsdichte und anderer Faktoren ausgewählt. Bis 2026 soll in über 200 Gebäuden der Anschluss an das Fernwärmenetz vorbereitet werden. Das Projekt zielt darauf ab, wichtige Erkenntnisse für die weitere Umstellung auf klimafreundliche Heizsysteme zu gewinnen.\n\nhttps://positionen.wienenergie.at/projekte/waerme-kalte/pioniergebiete-fernwaerme-ausbau/?utm_source=mailpoet&utm_medium=email&utm_campaign=energiepolitisches-update_21\n\nIn diesem Szenario gewinnt Elektrizität zunehmend an Bedeutung und wird die wichtigste Energiequelle, da sie nach und nach fossile Energien ersetzt. Besonders deutlich wird dies im Transportsektor, in dem der Anteil fossiler Energien von überwiegend 2030 auf nur noch einen Bruchteil 2050 sinkt. Auch im Gebäudesektor wird mehr elektrifiziert, muss aber auch deutlich Energie eingespart werden durch Sanierungen. In der Industrie und im Transportsektor spielt Wasserstoff eine wichtige Rolle.\n\nhttps://positionen.wienenergie.at/grafiken/sektoraler-energieverbrauch-im-netto-null-szenario/?utm_source=mailpoet&utm_medium=email&utm_campaign=energiepolitisches-update_21\n\nhttps://positionen.wienenergie.at/themen/waermewende/geothermie/\n\nhttps://positionen.wienenergie.at/projekte/waerme-kalte/grosswaermepumpe/\n\nhttps://de.statista.com/infografik/29432/anteil-der-waermepumpen-im-wohngebaeude-neubau-in-deutschland/?utm_source=Statista+Newsletters&utm_campaign=c2408728be-All_InfographTicker_daily_DE_AM_KW37_2023_Mo&utm_medium=email&utm_term=0_662f7ed75e-c2408728be-348811470\n\nhttps://positionen.wienenergie.at/blog/energieeffizienzgesetz-beschlossen/?utm_source=mailpoet&utm_medium=email&utm_campaign=energiepolitisches-update_21\n\nIm Mai 2023 wurde ein wichtiger Meilenstein für erneuerbare Energie erreicht: Das erste Mal wurde in der Europäischen Union mehr Strom aus Solar- und Windkraft erzeugt als aus fossilen Brennstoffen.\n\nhttps://ember-climate.org/press-releases/wind-and-solar-overtake-fossil-generation-in-the-eu/\n\nhttps://de.statista.com/infografik/27643/anteil-von-solar-und-wind-an-der-nettostromerzeugung-in-deutschland/?utm_source=Statista+Newsletters&utm_campaign=06759db03d-All_InfographTicker_daily_DE_AM_KW29_2023_Di&utm_medium=email&utm_term=0_662f7ed75e-06759db03d-348811470\n    ";
replaceWithMarkdownLinks(inputText).then(result => {
    console.log(result);
});