import Link from 'next/link';
import React, {useState} from 'react';
import {Site} from '../../components/Site';

export default function Spenden({}) {
  const [showUpdate, setShowUpdate] = useState(false);

  return <Site title="Admin">
    <div className="mt-8 mb-1 text-primary-500 text-lg font-bold">Seitenstruktur</div>
    <Link href="admin/struktur">
      <div className="my-1 px-2 bg-blue-900 text-white rounded hover:opacity-90 inline-block cursor-pointer" style={{background: '#0e1e25'}}>
        ansehen
      </div>
    </Link>
    <div className="mt-8 mb-1 text-primary-500 text-lg font-bold">Standard Design</div>
    <Link href="admin/design">dd
      <div className="my-1 px-2 bg-blue-900 text-white rounded hover:opacity-90 inline-block cursor-pointer" style={{background: '#0e1e25'}}>
        ansehen
      </div>
    </Link>
  </Site>;
}
