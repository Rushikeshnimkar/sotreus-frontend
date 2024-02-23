import React from "react";
const crypto = require("crypto");
const cryptojs = require("crypto-js");
const curve25519 = require("curve25519-js");

const getClients = async (req, res) => {
  const preSharedKey = cryptojs.lib.WordArray.random(32);
  // Encode the keys in base64

  const preSharedKeyB64 = preSharedKey.toString(cryptojs.enc.Base64);

  const keyPair = curve25519.generateKeyPair(crypto.randomBytes(32));
  const privKey = Buffer.from(keyPair.private).toString("base64");
  const pubKey = Buffer.from(keyPair.public).toString("base64");

  return res.status(200).json({
    publicKey: pubKey,
    privateKey: privKey,
    preSharedKey: preSharedKeyB64,
  });
};

export default getClients;
