import React from "react";
import { Site } from "../components/Site";

export default function Home({ time }) {
  return <Site>Time: {time}</Site>;
}
export async function getServerSideProps(context) {
  return {
    props: { time: new Date().getTime() },
  };
}
