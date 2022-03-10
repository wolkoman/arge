import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {Site} from '../../components/Site';
import {cockpitHost, fetchCollection} from '../../util/cockpit';
import Markdown from '../../components/Markdown';

export default function Design({}) {
  return <Site title="Design">
    <div className="text-5xl font-bold mb-6 text-primary-500">Design</div>
    <Markdown children={"# \# Erste Überschrift \n ## \#\# Zweite Überschrift \n ### \#\#\# Dritte Überschrift <div style='height:30px'/>  *&ast;Einfache Hervorhebung&ast;* \n\n **&ast;&ast;Besondere Hervorhebung&ast;&ast;** <div style='height:30px'/> Fließtext"}/>
  </Site>;
}