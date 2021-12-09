import {fetchCollection} from '../../util/cockpit';
import {Site} from '../../components/Site';
import {getCategoryUrl} from '../../components/HierachyArticles';

function Page(props) {
  return <Site><p>{JSON.stringify(props)}</p></Site>;
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

export const getStaticPaths = async () => {
  const routes = await getAllRevelantRoutes();
  console.log(routes);
  return {
    paths: routes.map(route => ({params: {route: route}})),
    fallback: false
  };
}

export const getStaticProps = async ({params: {route}}) => {
  const items = await getAllItems();
  const itemId = route[route.length - 1];
  const item = items.find(item => item._id === itemId);
  return { redirect: {destination: "/"+[item.collectionUrl, ...getCategoryUrl(item,items)].join("/")}};
}