import Head from 'next/head';
import React from 'react';
import {Footer} from './Footer';
import {Navbar} from './Navbar';
import {Responsive} from './Responsive';

export const Site = (props: { title: string; children: any; responsive?: boolean; }) => {
    return (
        <div className="min-h-screen print:bg-white flex flex-col justify-between">
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>
                <Navbar/>
                {
                    (props.responsive ?? true)
                        ? <div className="my-8"><Responsive>{props.children}</Responsive></div>
                        : props.children
                }
            </div>
            <div className="z-10">
                <Responsive>
                    <Footer/>
                </Responsive>
            </div>
        </div>
    );
};
