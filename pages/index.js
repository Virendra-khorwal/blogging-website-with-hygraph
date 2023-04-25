import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Blogging website with Hygraph</title>
      </Head>
      <main>
        <h1>
          List of Blogs 
        </h1>
        
        </main>;
    </>
  ); 
}
