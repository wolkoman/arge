import "../styles/tailwind.css";
import {pageview} from "../util/google-analytics";
import {useRouter} from "next/router";
import {useEffect} from "react";

function ArgeSchoepfungApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />;
}

export default ArgeSchoepfungApp;
