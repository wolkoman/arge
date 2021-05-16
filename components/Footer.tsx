import Link from "next/link";
import React from "react";

export const Footer = ({}) => {
  return (
    <div className="flex flex-col md:flex-row py-8 px-8 mt-auto print:hidden">
      <div className="flex-1 py-8">
        <div className="font-bold text-xl text-primary-500">Kontakt</div>
        <b>Arbeitsgemeinschaft Schöpfungsverantwortung</b><br/>
        Peterskirche Petersplatz 1, 1010 Wien<br/>
        Tel. : +43-660-76 000 08 <br />
        Email: office(at)argeschoepfung.at
      </div>
      <div className="flex-1 py-8">
        <div className="font-bold text-xl text-primary-500">Datenschutz</div>
        Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. In diesen{" "}
        <Link href="/datenschutz"><div className="underline hover:no-underline cursor-pointer">Datenschutzinformationen</div></Link> infomrmieren wir Sie über die wichtigsten
        Aspekte der Datenverarbeitung im Rahmen unserer Website.
      </div>
    </div>
  );
};
