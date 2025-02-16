import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from './ptw-interview/context/app-context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
