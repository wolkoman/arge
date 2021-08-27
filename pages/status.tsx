import React from 'react';

export default function Spenden({}) {
  return <></>;
}

export async function getStaticProps(context) {
  return {
    redirect: {
      destination: '/admin',
      permanent: true,
    },
  }
}