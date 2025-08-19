import '../styles/globals.css';
import 'leaflet/dist/leaflet.css';
import { Noto_Sans_KR } from 'next/font/google';
import Head from 'next/head';

const noto = Noto_Sans_KR({ subsets: ['latin'], weight: ['400','500','700','900'], display: 'swap', variable: '--font-noto' });

export default function App({ Component, pageProps }) {
  return (
    <div className={noto.variable}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}


