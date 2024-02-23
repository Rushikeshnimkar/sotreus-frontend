import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Howto from "../components/Howto";
import Pricing from "../components/Pricing";
import { motion } from "framer-motion";
import { useAddress } from "@thirdweb-dev/react";
import Link from 'next/link';

export default function Home() {
  const address = useAddress();

  return (
    <div>
      <Head>
        <meta charset="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="description" content="Where decentralization meets VPN for ultimate internet security.
Anonymous Virtual Private Network for accessing internet in stealth mode bypassing filewalls and filters."></meta>
        <meta name="keywords" content="Sotrues, vpn, dedicated, mint, 111, nft, clients, netsepio, apt, aptos"></meta>
        <title>Sotreus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{backgroundImage: 'radial-gradient(ellipse at top left, #040819 20%, #75E2FF, #244D617D)'}} className="py-32">
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-start lg:h-full md:mt-16 mt-8 lg:ml-0 lg:mr-0 md:ml-0 md:mr-0 ml-4 mr-4 mb-36 lg:mb-0 ">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-5xl font-bold text-gray-300 mb-6 lg:text-center md:text-center md:w-[60%]"
          >
            VPN and Firewall for Unrestricted, <br></br>
Speedy Internet Access
          </motion.h1>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-md text-white mb-8 lg:w-[35%] lg:text-center md:text-center md:w-[60%]"
          >
            <p>
            Bypass restrictions and protect privacy with advanced VPN technology
            </p>
          </motion.h1>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-black font-bold py-3 px-14 rounded-full bg-white" 
            style={{backgroundImage: 'linear-gradient(#FFFFFF00, #0099FF)'}}
          >
            <Link href="/mint">
              Subscribe Now
            </Link>
          </motion.div>
        </div>
      </div>

      <Features />
      </div>

      <Howto />
      {/* <Pricing /> */}
      <Footer />
    </div>
  );
}
