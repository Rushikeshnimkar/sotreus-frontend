import React from "react";
import Link from "next/link";
import { FaExternalLinkAlt, FaExternalLinkSquareAlt } from "react-icons/fa";
import { GoLinkExternal } from "react-icons/go";

const Howto = () => {
  return (
    <div
      id="howto"
      className="flex flex-col items-center justify-start scroll-mt-16 lg:scroll-mt-0 lg:mb-36 mb-24"
    >
      <div className="mb-2 font-figtree w-[60%] text-left">
        <h1 className="font-bold text-4xl lg:mb-16 mb-12 lg:mt-36 text-left text-gray-200">
        Discover Sotreus Unmatched Features
        </h1>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-row py-10 px-10 rounded-3xl gap-4" style={{backgroundColor:'#29ADB2'}}>
          <div className="w-1/2">
            <h2 className="text-white lg:text-2xl text-xl font-bold">
              <div className="flex items-center">
              Comprehensive Functionality
              </div>
            </h2>
            <p className="text-white text-sm mt-4">
            Offers APIs for WireGuard VPN management, including server/client 
info, configuration updates, and email distribution of client files, 
simplifying VPN operations.
            </p>
            </div>
            <div className="bg-white w-1/2 rounded-full">
            {/* <Link
              href="https://testnets.opensea.io/collection/erebrus-v4"
              target={"_blank"}
            > */}
              <img src="/image109.png" className="mx-auto" />
            {/* </Link> */}
            </div>
          </div>
          <div className="flex flex-row gap-4 py-10 px-10 rounded-3xl w-[100%]" style={{backgroundColor:'#9ED2BE'}}>
          <div className="w-1/2">
            <h2 className="text-white lg:text-2xl text-xl font-bold">
            Easy Integration
            </h2>
            <p className="text-white text-sm mt-4">
            Work seamlessly with WireGuard VPN services, allowing users 
to integrate and manage their VPN networks 
with ease.
            </p>
            </div>
          <div className="bg-black w-1/2 rounded-full">
          <img src="/image110.png " className="mx-auto" />
          </div>
          </div>
          
          <div className="flex flex-row gap-4 py-10 px-10 rounded-3xl w-[100%]" style={{backgroundColor:'#164B60'}}>
          <div className="w-1/2">
            <h2 className="text-white lg:text-2xl text-xl font-bold">
            Flexible Deployment
            </h2>
            <p className="text-white text-sm mt-4">
            API can be configured with different base 
URLs depending on the desired environment.
            </p>
            </div>
          <div className="bg-black w-1/2 rounded-full">
          <img src="/image111.png " className="mx-auto" />
          </div>
          </div>

          <div className="flex flex-row gap-4 py-10 px-10 rounded-3xl" style={{backgroundColor:'#1B6B93'}}>
          <div className="w-1/2">
            <h2 className="text-white lg:text-2xl text-xl font-bold">
            Security and Privacy
            </h2>
            <p className="text-white text-sm mt-4">
            Built on the secure and privacy-focused WireGuard VPN 
protocol, ensuring your VPN network remains protected 
and private.
            </p>
            </div>
          <div className="bg-black w-1/2 rounded-full">
          <img src="/image112.png " className="mx-auto" />
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Howto;
