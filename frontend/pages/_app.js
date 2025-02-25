import '../styles/globals.css'; 
import Navbar from '@/components/NavBar';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}