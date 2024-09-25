import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <LanguageProvider>
          <>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </>
        </LanguageProvider>
      </AuthProvider>
    </>
  );
}
