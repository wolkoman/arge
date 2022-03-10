import {fetchCollection} from '../../util/cockpit';
import {Site} from '../../components/Site';
import {getCategoryUrl} from '../../components/HierachyArticles';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

function Page(props) {
  const router = useRouter();
  useEffect(() => {
    router.push(props.redirect);
  }, []);
  return <Site title=""><p>{JSON.stringify(props.redirect)}</p></Site>;
}

export default Page

async function getAllItems() {
  const toplevel = [['topics', 'themen'], ['ueberuns', 'ueber-uns']];
  return (await Promise.all(toplevel.map(([collectionName, collectionUrl]) => fetchCollection(collectionName).then(items => items.map(item => ({
    ...item, collectionName, collectionUrl
  })))))).flat();
}

async function getAllRevelantRoutes() {
  const items = await getAllItems();
  const matches = items.map(item => item.content.match(/\(collection:\/\/(.*)\)/g)).filter(item => item !== null).flat();
  return matches.map(match => match.match(/.*\/\/(.*)\)/)[1].split("/"));
}

export const getServerSideProps = async ({params: {route}}) => {
  const items = await getAllItems();
  const itemId = route[route.length - 1];
  const item = items.find(item => item._id === itemId);
  return { props: {redirect: "/"+[item.collectionUrl, ...getCategoryUrl(item,items)].join("/")}};
}