import '../styles/globals.css';
import '../styles/custom.css';
import * as d3 from 'd3';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined') {
    window.d3 = d3;
  }
  return <Component {...pageProps} />;
}

export default MyApp;
