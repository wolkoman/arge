import Link from 'next/link';
import React from 'react';

export const Footer = ({}) => {
    return <div className="py-8 px-8 mt-24 border-t border-black/50 opacity-70">
        <Link href="/offenlegung">
            <div className="text-center">Offenlegung</div>
        </Link>
    </div>;
};
