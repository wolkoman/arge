export const Footer = ({}) => {
  return (
    <div className="flex flex-col md:flex-row py-8 px-8 mt-auto">
      <div className="flex-1 py-8">
        <div className="font-bold text-xl">Kontakt</div>
        Arbeitsgemeinschaft Schöpfungsverantwortung Peterskirche - Petersplatz
        1, 1010 Wien
        <br />
        Tel. : +43-660-76 000 08 <br />
        Email: office(at)argeschoepfung.at
      </div>
      <div className="flex-1 py-8">
        <div className="font-bold text-xl">Datenschutz</div>
        Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir
        verarbeiten Ihre Daten daher ausschließlich auf Grundlage der
        gesetzlichen Bestimmungen (DSGVO, TKG 2003). In diesen
        Datenschutzinformationen informieren wir Sie über die wichtigsten
        Aspekte der Datenverarbeitung im Rahmen unserer Website.
      </div>
    </div>
  );
};
