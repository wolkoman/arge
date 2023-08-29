export function getNews(){
  const url = `https://newsapi.org/v2/everything?q=Climate&sortBy=popularity&language=de&apiKey=${process.env.NEWSAPI_KEY}`;
  return fetch(url)
    .then(response => response.json())
}