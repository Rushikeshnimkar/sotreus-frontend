"use client"
import React, { useState } from "react";
import Cookies from "js-cookie";
import eye from '../public/ph_eye.png';
import dlt from '../public/dlt.png';
import {
  FaCopy,
} from "react-icons/fa";
import Image from 'next/image';
const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

interface ReviewCardProps {
  metaData: {
    name: string;
    VpnEndpoint: string;
    firewallEndpoint: string;
    vpn_api_port: number;
    vpn_external_port: number;
    password: string;
    region: string;
    status: string;
    ID: number;
  } | null;
  MyReviews?: boolean;
  // review?: ReviewCreated;
  onReviewDeleted?: () => void;
  onChildValue: (value: string) => void;
}

const background = {
  backgroundColor: "#222944",
};

const color = {
  color: "#788AA3",
};

const color2 = {
  color: "#75E2FF",
};

const border = {
  border: "1px solid #11D9C5",
};

const backgroundbutton = {
  backgroundColor: "#75E2FF",
};

const MyVpnCardDedicated: React.FC<ReviewCardProps> = ({
  metaData,
  MyReviews = false,
  onReviewDeleted,
  onChildValue
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [delvpn, setdelvpn] = useState(false);

  if (!metaData) {
    return (
      <div
        className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
      >
        <div
          className="w-full h-72 p-5 bg-center bg-cover"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            className="animate-spin rounded-full h-32 w-32 mx-auto border-t-2 border-b-2 border-green-200"
           
          ></div>
        </div>
      </div>
    );
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = () => {
    setShowDescription(!showDescription);
  };

  const handleDelete = () => {
    if (onReviewDeleted) {
      onReviewDeleted(); // Call the callback function when a review is deleted
    }
  };

  const deletevpn = async (id: string) => {
    setLoading(true);

    const auth = Cookies.get("sotreus_token");

    const jsonData = {
      "vpnId":id
    }

    try {
      const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/vpn?id=${metaData.name}`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(jsonData),
      });

      if (response.status === 200) {
        console.log("success")
        setdelvpn(false);
        onChildValue(`refreshdataafterdelete${metaData.name}`);
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full px-10"
      
    >
      <div
        className="w-full h-full py-4 border-t border-gray-500"
      >
                <div className="w-full flex justify-between">
                  <h3
                    className="text-2xl leading-12 mb-2 text-white w-1/6"
                    
                  >
                    <div className="flex text-lg">
                      <div>{metaData.name}</div>
                    </div>
                  </h3>

                  <div className="flex text-lg w-1/6 text-white">
                      <div>{metaData.region}</div>
                    </div>

                  <div className="lg:flex md:flex justify-between w-1/6">
                  <div
                    
                  > 
                    <button className="text-lg rounded-lg text-white">
                       <a href={`https://${metaData.VpnEndpoint}`} target="_blank" rel="noreferrer" style={color2}>
                       Link</a>
                    </button>    
                  </div>
              </div>
                  
              <button className="text-lg rounded-lg text-white flex w-1/6">
                       <a href={`https://${metaData.firewallEndpoint}`} target="_blank" rel="noreferrer" style={color2}>
                          Link</a>
                    </button> 

                  <div className="text-white text-lg w-1/6">
                    <p
                     
                      className="flex-col"
                    >
                      <Image src={eye} alt="" onClick={togglePasswordVisibility} className="h-5 w-5 mt-1 cursor-pointer"/>

                      <div className="">
                      {showPassword ? (

                        <div className="flex cursor-pointer" onClick={() => {
                          navigator.clipboard.writeText(
                            metaData? metaData.password : ''
                          );
                        }}>
                          {metaData.password}
                          <FaCopy style={{color:'#75E2FF'}} className="ml-2 mt-1"/>
                          </div>
                      ) : (
                        <span></span>
                      )}
                      </div>
                    </p>
                    
                  </div>

                  <div className="lg:flex md:flex justify-between w-1/8">
                  <div
                    
                  > 
                    <button className="text-lg rounded-lg pr-1 text-white" 
                    onClick={() => setdelvpn(true)}>
                    {/* onClick={() => deletevpn(metaData.name)}>   */}
                    <Image src={dlt} alt="info" className="w-4 h-4"/>
                    </button>    
                  </div>
              </div>

                </div>
                </div>
                {loading && (
        <div
          style={{
            position: "absolute",
            top: 700,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                border: "8px solid #f3f3f3",
                borderTop: "8px solid #3498db",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                animation: "spin 1s linear infinite",
              }}
            >
              {/* <Loader/> */}
            </div>
          </div>
        </div>
      )}

        {delvpn && (
        <div
          style={{ backgroundColor: "#0E1414D9" }}
          className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
          id="popupmodal"
        >
          <div className="relative lg:w-1/3 w-full max-w-2xl max-h-full">
            <div
              className="relative rounded-3xl shadow dark:bg-gray-700 p-16 md:p-20"
              style={{ backgroundColor: "#192424", border: "1px solid #75E2FF"}}
            >
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-4xl text-center text-white font-bold">
                  Are you sure?
                </p>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-md text-center text-white">
                  Do you really want to delete this client? This process can not
                  be undone.
                </p>
              </div>
              <div className="flex items-center p-4 md:p-5 rounded-b gap-4">
                <button
                  style={{ border: "1px solid #75E2FF", color: "#75E2FF" }}
                  onClick={() => setdelvpn(false)}
                  type="button"
                  className="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Cancel
                </button>
                <button
                  style={backgroundbutton}
                  onClick={() => deletevpn(metaData.name)}
                  type="button"
                  className="w-full text-black font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyVpnCardDedicated;