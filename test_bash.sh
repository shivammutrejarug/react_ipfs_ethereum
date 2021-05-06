#!/bin/bash
echo $(pwd)
cd $(dirname $0)
cd "get_hash"
echo $(pwd)
zokrates compile -i create_hash.zok
echo -n "Please enter your ipfs hash :"
read IPFS
echo "Your ipfs hash is $IPFS"
HASH=$(curl -X GET https://ipfs.infura.io:5001/api/v0/block/get\?arg\=$IPFS | shasum -a 256 | sed 's/-//')
echo $HASH
OUTPUT=$(node getIpfsHashParams.js $HASH)
echo $OUTPUT
$OUTPUT

echo "I am sleeping for 3 seconds, so that you can copy these two strings."

sleep 3

cd ".."
echo $(pwd)
zokrates compile -i root.zok

# echo $OUTPUT
zokrates setup
zokrates export-verifier

echo -n "Please enter your private key: "
read PKEY

sleep 3

echo -n "Please enter random private key: "
read RPKEY


echo -n "Please enter the first part of the copied string from the second step: "
read FSTRING

echo -n "Please enter the second part of the copied string from the second step: "
read SSTRING

cd "client"
echo $(pwd)

OUTPUT=$(node getParams.js $PKEY $RPKEY $IPFS $FSTRING $SSTRING)
echo $OUTPUT
$OUTPUT
