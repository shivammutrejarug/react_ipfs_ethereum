
	var myArgs = process.argv.slice(2);
	console.log(myArgs);

	// const privKeySender = '2c0b30092ddea4c6e9062fc1b3304c3dd598252eb34a0c7ef31af1cd3e077576';
  // const privKeyReceiver = 'e9290fb1addeb2336c750afaf1248e91d038d9c39b2e1373a9fd973357297d29';


	// Get private key from the user as arguments.
	const privKeySender = myArgs[0];
	const privKeyReceiver = myArgs[1];


  const BN = require('bn.js');
  // let newKey = new BN(pubKey, 16).toString(16);
  // console.log(newKey);
  var Wallet = require('ethereumjs-wallet');
  var EthUtil = require('ethereumjs-util');

  // console.log("read this", Wallet.getAddress());

  const crypto = require('crypto');

  // Get private key of sender
  const wallet = Wallet.fromPrivateKey(Buffer.from(privKeySender, 'hex'));


  // Get public key of sender
  const publicKeySender = wallet.getPublicKeyString().slice(2,);
  console.log(publicKeySender);

	// Get private key of receiver
  const walletReceiver = Wallet.fromPrivateKey(Buffer.from(privKeyReceiver, 'hex'));


  // Get a public key of receiver
  const publicKeyReceiver = walletReceiver.getPublicKeyString().slice(2,);
  console.log(publicKeyReceiver);

	// Make public key of sender zokrates compatible
  let paddedAddressSender = new BN(publicKeySender, 16).toString(10);
  console.log("Public Key Sender", paddedAddressSender.slice(0,77));
  console.log(paddedAddressSender.slice(77,));


	// Make public key of receiver zokrates compatible
  let paddedAddressReceiver = new BN(publicKeyReceiver, 16).toString(10);
  console.log("Public Key Receiver", paddedAddressReceiver.slice(0,77));
  console.log(paddedAddressReceiver.slice(77,));


	// Make private key of sender zokrates compatible
  let privateSender = new BN(privKeySender, 16).toString(10);
  console.log("Private key sender", privateSender);
  console.log(privateSender.length);

	// Make private key of receiver zokrates compatible
  let privateReceiver = new BN(privKeyReceiver, 16).toString(10);
  console.log("Private key receiver", privateReceiver);
  console.log(privateReceiver.length);


	// Make ipfs hash zokrates compatible
  let cmd = new BN(myArgs[2], 16).toString(10);
  console.log(cmd.length);
  console.log("Secret part 1", cmd.slice(0,39));
  console.log("Secret part 2", cmd.slice(39,));
  console.log("Secret part 3", 0);
  console.log("Secret part 4", 0);


  let ho = "7526918299517310424649411049846269940";
  let h1 = "94480374055748278118937174248038871405";
  let hexed = new BN(ho + h1, 16).toString(16);
  console.log("Hash 1", hexed.slice(0,37));
  console.log("Hash 2", hexed.slice(37,));


	console.log("Final command to run for witness - \n zokrates compute-witness -a", paddedAddressSender.slice(0,77),
	paddedAddressSender.slice(77,), paddedAddressReceiver.slice(0,77),
	paddedAddressReceiver.slice(77,), hexed.slice(0,37), hexed.slice(37,),
	privateSender, cmd.slice(0,39), cmd.slice(39,), 0, 0, privateReceiver
	);
