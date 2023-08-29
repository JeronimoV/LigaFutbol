import Head from "next/head";
import "./globals.css";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("../components/navbar/navbarComponent"), {
  ssr: false,
});

export const metadata = {
  title: "Liga Futbol",
  description: "Liga de futbol amateur en Argentina",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
