import "../styles/globals.css";
import Navbar from "@/components/NavBar";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/contexts/AuthContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow md:pt-12">
          {" "}
          <Component {...pageProps} />
        </main>
      </div>
    </AuthProvider>
  );
}
