import {fetchCollection} from '../../util/cockpit';
import {encodeSlug} from '../../util/slug';
import {Site} from '../../components/Site';
import React from 'react';
import {Breadcrums} from '../../components/Breadcrums';
import Markdown from '../../components/Markdown';

export default function Article({article}) {
  return <Site title={article.title}>
    <Breadcrums
      crums={[{name: "Startseite", link: "/"}, {name: article.title, link: `/artikel/${encodeSlug(article.title)}`}]}/>
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
    title: "Handlungsfeld Konsum und Produktion: Online-Shopping-Fasten",
    content: [{
      value: {
        _id: "5063f98c336336c7aa000324",
        display: "Schöpfungszeit",
        link: "topics"
      }
    }],
    preview: "In der Fastenzeit sollten Sie Online-Bestellungen vermeiden, da sie einen hohen logistischen Aufwand verursachen und Rücksendungen unnötige Energie verbrauchen. Lokal verfügbare Geschäfte, die zu Fuß, mit dem Rad oder öffentlichen Verkehrsmitteln erreichbar sind, verbessern die Umweltbilanz des Handels und unterstützen die Innenstadt.",
    image: {
      path: "/storage/uploads/2024/02/13/1_uid_65cb34040d44e.webp"
    },
    hidden: false,
  },
  {
    title: "Handlungsfeld Energie: Smartphone-Fasten",
    content: [{
      value: {
        _id: "506e94b0663463d049000226",
        display: "Schöpfungszeit",
        link: "topics"
      }
    }],
    preview: "\n" +
      "Smartphone und Internet Fasten, auch bekannt als \"Digital Detox\", fördert bewussten Umgang mit Technologie, reduziert Umweltbelastung durch Geräteproduktion und verlängert die Lebensdauer von Elektronikgeräten durch richtige Akkupflege.",
    image: {
      path: "/storage/uploads/2024/02/13/DALLE-2024-02-13-10.15.21---A-photorealistic-image-featuring-a-turned-off-smartphone-laying-on-a-countertop-in-the-foreground.-In-the-background-a-woman-is-absorbed-in-reading-a_uid_65cb344e9ba8c.webp"
    },
    hidden: false,
  },
  {
    title: "Handlungsfeld Ernährung und Landnutzung: Fleisch- und/oder Milchfasten",
    content: [{
      value: {
        _id: "5063f98c336336c7aa000324",
        display: "Schöpfungszeit",
        link: "topics"
      }
    }],
    slug: "helidome",
    preview: "\n" +
      "\n" +
      "Eine klimafreundliche Ernährung bedeutet weniger tierische Produkte, mehr Pflanzen, saisonales und regionales Gemüse und Obst, Vermeidung von verarbeiteten Lebensmitteln sowie die Nutzung von Freilandwaren und umweltfreundlichen Transportmitteln wie Laufen oder Radfahren beim Einkaufen.",
    image: {
      path: "/storage/uploads/2024/02/13/DALLE-2024-02-13-10.17.41---A-basket-filled-with-an-assortment-of-fresh-fruits-and-vegetables-showcasing-a-variety-of-colors-and-textures.-The-image-should-capture-the-details-s_uid_65cb344f0bebe.webp"
    },
    hidden: false,
  },
  {
    title: "Handlungsfeld Mobilität: Beton-Fasten ",
    content: [{
      value: {
        _id: "508f2c6537363954cf0001e7",
        display: "Schöpfungszeit",
        link: "topics"
      }
    }],
    preview: "\n" +
      "Vermeiden Sie in der Fastenzeit große Einkaufszentren und Freizeiteinrichtungen am Stadtrand, da diese zur zunehmenden Bodenversiegelung beitragen, und erkunden Sie stattdessen alternative Einkaufsmöglichkeiten wie kleine Geschäfte in Innenstädten oder nachhaltige Läden mit unverpackten Produkten.",
    image: {
      path: "/storage/uploads/2024/02/13/DALLE-2024-02-13-10.19.21---A-bustling-shopping-street-in-downtown-Vienna-filled-with-the-vibrant-activity-of-shoppers-and-tourists.-The-street-is-lined-with-charming-local-stor_uid_65cb344f7a611.webp"
    },
    hidden: false,
  }, {
    title: "Handlungsfeld Wohnen: Stand-by-fasten",
    content: [{
      value: {
        _id: "509ea9dc3332647f440001b5",
        display: "Schöpfungszeit",
        link: "topics"
      }
    }],
    preview: "\n" +
      "Im Haushalt verbrauchen Geräte im Stand-by-Modus viel Energie, daher ist es wichtig, sie komplett auszuschalten und auf energieeffiziente Produkte zu achten, um den Energieverbrauch zu reduzieren und zur EU-Energiestrategie 2030 beizutragen.",
    image: {
      path: "/storage/uploads/2024/02/13/DALLE-2024-02-13-10.23.48---A-photorealistic-image-of-a-European-electrical-outlet-with-a-plug-that-is-unplugged-hanging-loosely-next-to-the-outlet.-The-outlet-is-mounted-on-a-w_uid_65cb3533f005a.webp"
    },
    hidden: false,
  },
]