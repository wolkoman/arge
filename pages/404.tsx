import Link from "next/link";

export default function FourOhFour() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div>
          <div className="font-bold">Seite nicht gefunden</div>
          <Link href="/">
            <div className="text-sm cursor-pointer">Zurück zur Startseite</div>
          </Link>
        </div>
      </div>
    </>
  );
}
