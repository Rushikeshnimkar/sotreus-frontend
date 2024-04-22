import Link from "next/link";
import { useState, useEffect, useContext } from "react";
// import {
//   useNetworkMismatch,
//   useNetwork,
//   useAddress,
//   ChainId,
//   ConnectWallet,
//   useSDK,
// } from "@thirdweb-dev/react";
import { 
  ConnectButton, 
  useWallet, 
  addressEllipsis,
} from "@suiet/wallet-kit";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthContext";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
// import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";
import dynamic from "next/dynamic";
// import { Network } from "@aptos-labs/ts-sdk";
import Button from "../components/Button";
import { useRouter } from 'next/router';
import SingleSignerTransaction from "../components/transactionFlow/SingleSigner";
const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
const mynetwork = process.env.NEXT_PUBLIC_NETWORK;

const variants = {
  open: { opacity: 1, x: 0, y: 0 },
  closed: { opacity: 0, y: 0 },
};

// const WalletSelectorAntDesign = dynamic(
//   () => import("../components/WalletSelectorAntDesign"),
//   {
//     suspense: false,
//     ssr: false,
//   }
// );

const isSendableNetwork = (connected, network) => {
  return (
    connected &&
    ( network === mynetwork)
  );
};

const Navbar = ({ isHome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [showsignbutton, setshowsignbutton] = useState(false)
  const [link, setlink] = useState("");
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState("");
  // const sdk = useSDK();

 
  const {status, connected, connecting , account , network,activeAccount, name} = useWallet();
  const wallet = useWallet();
  let sendable = isSendableNetwork(status === "connected", wallet.chain.id);

  const router = useRouter();
  console.log("router", router);

  console.log("account details", account);

  const address = Cookies.get("sotreus_wallet");
  const token = Cookies.get("sotreus_token");

  useEffect(() => {
    if (account && account.address) {
      // Update the cookie with the new address
      Cookies.set("sotreus_wallet", account.address);
      onSignMessage();
    }
  }, []);


  // const [, switchNetwork] = useNetwork();
  // const isMismatched = useNetworkMismatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsSignedIn(true);
    }

    let timeoutId = null;

    const getSignMessage = async () => {
      if (!address || address !== sessionStorage.getItem("address")) {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
          signOut();
        }, 500);
      } else {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }

        const response = await axios.get("api/getChallengeId", {
          params: { walletAddress: address },
          headers: {
            "Content-Type": "application/json",
          },
        });

        setMessage(response.data.eula + response.data.challangeId);
        setChallengeId(response.data.challangeId);
      }
    };

    getSignMessage();

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // const signMessage = async () => {
  //   setIsSignedIn(false);
  //   console.log("signing message");
  //   const signature = await sdk?.wallet.sign(message);
  //   setSignature(signature);
  //   try {
  //     //make a post request to the erebrus server with the signature and challengeId
  //     const response = await axios.post(
  //       "api/getToken",
  //       {
  //         signature,
  //         challengeId,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.data.status === 200) {
  //       //store the token in the session storage
  //       sessionStorage.setItem("token", response.data.token);
  //       localStorage.setItem("token", response.data.token);
  //     }
  //     setIsSignedIn(true);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getRandomNumber = () => Math.floor(Math.random() * 1000);
        const apiUrl = `https://api.multiavatar.com/${getRandomNumber()}`;

        const response = await axios.get(apiUrl);
        const svgDataUri = `data:image/svg+xml,${encodeURIComponent(response.data)}`;
        setAvatarUrl(svgDataUri);
      } catch (error) {
        console.error('Error fetching avatar:', error.message);
      }
    };

    fetchData();
  }, []);

  const signOut = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    setMessage("");
    setSignature("");
    setChallengeId("");
    setIsSignedIn(false);
  };

  // const getAptosWallet = () => {
  //   if ("aptos" in window) {
  //     return window.aptos;
  //   } else {
  //     window.open("https://petra.app/", "_blank");
  //   }
  // };

  // const connectWallet = async () => {
  //   const wallet = getAptosWallet();
  //   try {
  //     const response = await wallet.connect();

  //     const account = await wallet.account();
  //     console.log("account", account);

  //     // Get the current network after connecting (optional)
  //     const networkwallet = await window.aptos.network();

  //     // Check if the connected network is Mainnet
  //     if (networkwallet === mynetwork) {

  //     const { data } = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${account.address}`);
  //     console.log(data);

  //     const message = data.payload.eula;
  //     const nonce = data.payload.flowId;
  //     const publicKey = account.publicKey;

  //     const { signature, fullMessage } = await wallet.signMessage({
  //       message,
  //       nonce,
  //     });
  //     console.log("sign", signature, "full message", fullMessage);

  //     let signaturewallet = signature;

  //     if(signaturewallet.length === 128)
  //     {
  //       signaturewallet = `0x${signaturewallet}`;
  //     }

  //     const authenticationData = {
  //       flowId: nonce,
  //       signature: `${signaturewallet}`,
  //       pubKey: publicKey,
  //     };

  //     const authenticateApiUrl = `${REACT_APP_GATEWAY_URL}api/v1.0/authenticate`;

  //     const config = {
  //       url: authenticateApiUrl,
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: authenticationData,
  //     };

  //     try {
  //       const response = await axios(config);
  //       console.log("auth data", response.data);
  //       const token = await response?.data?.payload?.token;
  //       const userId = await response?.data?.payload?.userId;
  //       // localStorage.setItem("platform_token", token);
  //       Cookies.set("sotreus_token", token, { expires: 7 });
  //       Cookies.set("sotreus_wallet", account.address, { expires: 7 });
  //       Cookies.set("sotreus_userid", userId, { expires: 7 });

  //       // setUserWallet(account.address);
  //       window.location.reload();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     }
  //   else{
  //     alert(`Switch to ${mynetwork} in your wallet`)
  //   }

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  console.log(wallet)
  async function handleSignMsg() {
    try {
      const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
      const { data } = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/flowid/sol?walletAddress=${account.address}`);
      const msg =  data.payload.eula;
      const nonce = data.payload.flowId;
    

      // convert string to Uint8Array 
      const msgBytes = new TextEncoder().encode(msg)
      
      const result = await wallet.signPersonalMessage({
        message: msgBytes,
        account: activeAccount
        
      })
      
      
      
      console.log("result ", atob(result.bytes))
            // verify signature with publicKey and SignedMessage (params are all included in result)
      const verifyResult = await wallet.verifySignedMessage(result, wallet.account.publicKey)
      if (!verifyResult) {
        console.log('signPersonalMessage succeed, but verify signedMessage failed')
      } else {
        console.log('signPersonalMessage succeed, and verify signedMessage succeed!')
      }
    } catch (e) {
      console.error('signPersonalMessage failed', e)
    }
   

  // const onSignMessage = async () => {
  //   if (sendable) {
  //     try {
  //       const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
      
  //       const { data } = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${account?.address}`);
  //       console.log(data);
  
  //       const message = data.payload.eula;
  //       const nonce = data.payload.flowId;
  //       const publicKey = account?.publicKey;
  
  //       const payload = {
  //         message: message,
  //         nonce: nonce,
  //       };
  //       const response = await signMessage(payload);
  //       console.log(response);

  //       let signaturewallet = response.signature;

  //     if(signaturewallet.length === 128)
  //     {
  //       signaturewallet = `0x${signaturewallet}`;
  //     }
  
      const authenticationData = {
        "flowId": nonce,
        "walletAddress": wallet.address,
      };
  
        const authenticateApiUrl = `${REACT_APP_GATEWAY_URL}api/v1.0/authenticate/NonSign`;
  
        const config = {
          url: authenticateApiUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: authenticationData,
        };
  
        const authResponse = await axios(config);
        console.log("auth data", authResponse.data);
  
        const token = await authResponse?.data?.payload?.token;
        const userId = await authResponse?.data?.payload?.userId;
  
        Cookies.set("sotreus_token", token, { expires: 7 });
        Cookies.set("sotreus_wallet", account?.address ?? '', { expires: 7 });
        Cookies.set("sotreus_userid", userId, { expires: 7 });
  
        window.location.reload();
    //   } catch (error) {
    //     console.error(error);
    //     setshowsignbutton(true);
    //   }
    // } else {
    //   alert(`Switch to ${mynetwork} in your wallet`);
    // }
  };
  

  const handleDeleteCookie = () => {
    Cookies.remove("sotreus_wallet");
    Cookies.remove("sotreus_token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-transparent py-4">
      <div
        className={`container mx-auto px-10 flex items-center justify-between lg:mb-0 ${
          isHome && !isOpen ? "mb-24" : ""
        }`}
      >
        <div className="flex items-center">
          <Link href="/" scroll={false}>
            <div className="block">
              <img src="/favicon.ico" alt="Logo" className="" />
            </div>
          </Link>
          <Link href="/" scroll={false}>
          <img src="/Sotreus.png" alt="Logo" className="w-20 h-8 ml-2" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center">
        {/* { link !== "mint" ?(
          <Link
            href="/mint"
            className="text-gray-300 mr-8"
            scroll={false}
            onClick={()=> {setlink("mint")}}
            style={{ textDecoration: "none", position: "relative",
            borderBottom: router.pathname.includes('mint') ? '2px solid white' : '', }}
  onMouseOver={(e) => (e.currentTarget.style.borderBottom = "1px solid #fff")}
  onMouseOut={(e) => (e.currentTarget.style.borderBottom = "none")}
          >
            Mint NFT
          </Link>):
          (
<Link
            href="/mint"
            className="text-gray-300 mr-8"
            scroll={false}
            style={{ textDecoration: "none", position: "relative",
            borderBottom:'2px solid white'}}
          >
            Mint NFT
          </Link>
          )} */}
          {/* <Link href="/demo" className="text-gray-300 mr-8">
            Demo
          </Link>
          <Link href="/clients" className="text-gray-300 mr-8">
            Clients
          </Link> */}
          { link !== "subscription" ?(
          <Link
            href="/subscription"
            className="text-gray-300 mr-8"
            scroll={false}
            onClick={()=> {setlink("subscription")}}
            style={{ textDecoration: "none", position: "relative",
            borderBottom: router.pathname.includes('subscription') ? '2px solid white' : '', }}
  onMouseOver={(e) => (e.currentTarget.style.borderBottom = "1px solid #fff")}
  onMouseOut={(e) => (e.currentTarget.style.borderBottom = "none")}
          >
            Subscription
          </Link>):
          (
<Link
            href="/subscription"
            className="text-gray-300 mr-8"
            scroll={false}
            style={{ textDecoration: "none", position: "relative",
            borderBottom:'2px solid white'}}
          >
            Subscription
          </Link>
          )}

          <Link href="" target="_blank" className="text-gray-300 mr-8"
            onMouseOver={(e) => (e.currentTarget.style.borderBottom = "1px solid #fff")}
            onMouseOut={(e) => (e.currentTarget.style.borderBottom = "none")}
            >
          Setup VPN
          </Link>

          {/* {isMismatched && (
            <button
              className="text-purple-400 mr-12"
              onClick={() => switchNetwork(ChainId.Mumbai)}
            >
              Switch To Mumbai
            </button>
          )} */}
          {/* {address && !isSignedIn && (
            <button
              className="bg-blue-500 text-white lg:mr-20 font-bold py-2 px-4 rounded-lg"
              onClick={signMessage}
            >
              Sign In
            </button>
          )} */}
          {/* {address && isSignedIn && (
            <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl">
              <button onClick={connectWallet}>Connect</button>
            </div>
          )} */}

{/* {account?.address && (
            <div className="lg:mt-0 mt-4 lg:mr-4 z-50 rounded-xl text-white">
              <div>
                {account?.address.slice(0, 4)}...{account?.address.slice(-4)}
              </div>
              {
                token && (
                  <button onClick={handleDeleteCookie} 
                  onMouseOver={(e) => (e.currentTarget.style.borderBottom = "1px solid #fff")}
            onMouseOut={(e) => (e.currentTarget.style.borderBottom = "none")}>Logout</button>
                )
              }  
            </div>
          )} */}
          
          {!token ? (
            <div className="lg:mt-0 mt-4 z-50 rounded-xl text-white">
             
             
             <ConnectButton label="connect" />
             
          {status === "connected" && showsignbutton && (
            // <SingleSignerTransaction isSendableNetwork={isSendableNetwork} />
            <Button
          color={"blue"}
          onClick={handleSignMsg}
          disabled={false}
          message={"Authenticate"}
        />
          )} 
            </div>
          ):
          (
<div className="lg:mt-0 mt-4 z-50 rounded-xl flex gap-4" style={{color:'#0162FF'}}>
              {/* <div>
                {address?.slice(0, 4)}...{address?.slice(-4)}
              </div> */}
              <button onClick={handleDeleteCookie} 
              onMouseOver={(e) => (e.currentTarget.style.borderBottom = "1px solid #0162FF")}
            onMouseOut={(e) => (e.currentTarget.style.borderBottom = "none")}>Log out</button>
            {avatarUrl && <img src={avatarUrl} alt="Avatar" className="w-10 ml-auto"/>}
            </div>
          )}

        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 rounded-full text-gray-300"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <motion.nav animate={isOpen ? "open" : "closed"} variants={variants}>
        {isOpen && (
          <div className="bg-transparent py-4">
            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center lg:justify-between">
              <div className="flex flex-col lg:flex-row items-center">
                {/* <Link
                  href="/demo"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                  scroll={false}
                >
                  Demo
                </Link> */}
                <Link
                  href="/mint"
                  className="text-white font-bold block lg:inline-block lg:mr-0 mb-4 lg:mb-0"
                  scroll={false}
                >
                  Mint NFT
                </Link>
                <Link
                  href="/subscription"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                >
                  Subscription
                </Link>

                {account?.address && (
            <div className="lg:mt-0 mt-4 lg:mr-4 z-50 rounded-xl flex gap-4" style={{color:'#0162FF'}}>
              {/* <div>
                {account?.address.slice(0, 4)}...{account?.address.slice(-4)}
              </div> */}
              {
                address && (
                  <button onClick={handleDeleteCookie} 
                  onMouseOver={(e) => (e.currentTarget.style.borderBottom = "1px solid #0162FF")}
                  onMouseOut={(e) => (e.currentTarget.style.borderBottom = "none")}>Log out</button>
                )
              } 
              {avatarUrl && <img src={avatarUrl} alt="Avatar" className="w-10 ml-auto"/>} 
            </div>
          )}
          
          {!address && (
            <div className="lg:mt-0 mt-4 z-50 rounded-xl text-white">
             
             {!connected && ( <button 
              // onClick={connectWallet}
              >
               <ConnectButton label="connect"/>
              </button>
             )}
              {connected && (
            <SingleSignerTransaction isSendableNetwork={isSendableNetwork} />
          )} 
            </div>
          )}

{address && (
            <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl flex gap-4" style={{color:'#0162FF'}}>
              {/* <div>
                {address.slice(0, 4)}...{address.slice(-4)}
              </div> */}
              <button onClick={handleDeleteCookie}
              onMouseOver={(e) => (e.currentTarget.style.borderBottom = "1px solid #0162FF")}
              onMouseOut={(e) => (e.currentTarget.style.borderBottom = "none")}>Log out</button>
              {avatarUrl && <img src={avatarUrl} alt="Avatar" className="w-10 ml-auto"/>}
            </div>
          )}

                {/* {isMismatched && (
                  <button
                    className="text-purple-400"
                    onClick={() => switchNetwork(ChainId.Mumbai)}
                  >
                    Switch To Mumbai
                  </button>
                )} */}

                {/* {address && !isSignedIn && (
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={signMessage}
                  >
                    Sign In
                  </button>
                )}
                {address && isSignedIn && (
                  <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl">
                    <ConnectWallet />
                  </div>
                )}
                {!address && (
                  <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl">
                    <ConnectWallet />
                  </div>
                )} */}
              </div>
            </div>
          </div>
        )}
      </motion.nav>
    </nav>
  );
};

export default Navbar;
