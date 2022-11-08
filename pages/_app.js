import "../styles/tailwind.css";
import {useRouter} from "next/router";

function ArgeSchoepfungApp({Component, pageProps}) {
    const router = useRouter()

    return <Component {...pageProps} />;
}

export default ArgeSchoepfungApp;
