import { useState, useEffect, useContext } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import { useAddress } from "@thirdweb-dev/react";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import erebrusABI from "../utils/erebrusABI.json";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Cookies from 'js-cookie';
import { AuthContext } from "../AuthContext";

const Clients = () => {
  const provider = new ethers.providers.InfuraProvider(
    "maticmum",
    "bfa8e872ea014d979d17e288e0aea3e9"
  );
  const address = useAddress();
  const [isOwned, setIsOwned] = useState(false);
  const [apiData1, setApiData1] = useState(null);
  const [apiData2, setApiData2] = useState(null);
  const [isLoading1, setIsLoading1] = useState(false);
  const isSignedIn = Cookies.get("erebrus_wallet");

  useEffect(() => {
    if (address) {
      setIsOwned(false);
      const contract = new ethers.Contract(
        "0xA40166F872CC568b34410672eF3667cbc1865340",
        erebrusABI,
        provider
      );
      contract.balanceOf(address).then((balance) => {
        if (Number(balance) > 0) {
          setIsOwned(true);
        }
      });
      const fetchData = async () => {
        setIsLoading1(true);
        try {
          // Get token from session storage
          const token = sessionStorage.getItem("token");

          const response1 = await axios.get("/api/getClients", {
            params: { token },
          });
          const data1 = response1.data.clients.filter(
            (obj) => obj.WalletAddress === address
          );
          setApiData1(data1);

          const response2 = await axios.get("/api/getServerInfo", {
            params: { token },
          });
          const data2 = response2.data.server;
          setApiData2(data2);
        } catch (error) {
          console.error(error);
        }
        setIsLoading1(false);
      };
      fetchData();
    }
  }, [address]);

  if (!isSignedIn) {
    return (
      <>
        <Head>
          <title>Erebrus | Clients</title>
        </Head>
        <div className="flex justify-center mt-48 text-white bg-black h-screen">
          Please sign in to Erebrus to view your VPN clients
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Erebrus | Clients</title>
      </Head>
      {isOwned ? (
        <div className="container flex flex-col lg:flex-wrap lg:flex-row w-100 lg:justify-center justify-start items-center mx-auto px-4 bg-black text-white lg:h-screen h-full pt-8 pb-8 mt-8 lg:-mt-8">
          {isLoading1 ? (
            <div className="bg-black h-screen">Loading...</div>
          ) : apiData1 && apiData2 ? (
            apiData1.map((item1, index) => (
              <div className="mb-12 " key={item1.UUID}>
                <div className="flex flex-col">
                  <div className="card-header">
                    <h2 className="text-xl font-bold leading-tight">
                      {item1.Name}
                    </h2>
                  </div>
                  <div className="card-body">
                    <p className="mt-2 text-gray-700 w-40 mb-4">
                      UUID: {item1.UUID}
                    </p>
                    <p className="mt-2 text-gray-700 w-40 mb-4">
                      Tags: {item1.Tags}
                    </p>
                    <p className="mt-2 text-gray-700 w-40 mb-4">
                      Address: {apiData2.Address}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center text-white bg-black">
              <p className="mb-4">You have not created any clients yet.</p>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
                className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg "
              >
                <Link href="/demo">Create new client</Link>
              </motion.div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center mt-48 text-white bg-black h-screen">
          Please mint an Erebrus NFT to view your VPN client
        </div>
      )}
    </>
  );
};

export default Clients;
