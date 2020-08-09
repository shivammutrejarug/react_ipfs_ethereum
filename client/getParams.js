
	var myArgs = process.argv.slice(2);


	// const privKeySender = '2c0b30092ddea4c6e9062fc1b3304c3dd598252eb34a0c7ef31af1cd3e077576';
  // const privKeyReceiver = 'e9290fb1addeb2336c750afaf1248e91d038d9c39b2e1373a9fd973357297d29';

	// Get private key from the user as arguments.
	const privKeySender = myArgs[0];
	const privKeyReceiver = myArgs[1];
	const ipfsHash = myArgs[2];
	const basedHashOne = myArgs[3];
	const basedHashTwo = myArgs[4];


  const BN = require('bn.js');
  var Wallet = require('ethereumjs-wallet');
  var EthUtil = require('ethereumjs-util');

  const crypto = require('crypto');

  // Get private key of sender
  const wallet = Wallet.fromPrivateKey(Buffer.from(privKeySender, 'hex'));

  // Get public key of sender
  const publicKeySender = wallet.getPublicKeyString().slice(2,);

	// Get private key of receiver
  const walletReceiver = Wallet.fromPrivateKey(Buffer.from(privKeyReceiver, 'hex'));

  // Get a public key of receiver
  const publicKeyReceiver = walletReceiver.getPublicKeyString().slice(2,);

	// Make public key of sender zokrates compatible
  let paddedAddressSender = new BN(publicKeySender, 16).toString(10);


	// Make public key of receiver zokrates compatible
  let paddedAddressReceiver = new BN(publicKeyReceiver, 16).toString(10);

	// Make private key of sender zokrates compatible
  let privateSender = new BN(privKeySender, 16).toString(10);

	// Make private key of receiver zokrates compatible
  let privateReceiver = new BN(privKeyReceiver, 16).toString(10);


	// Make ipfs hash zokrates compatible
  let cmd = new BN(ipfsHash, 16).toString(10);

	// Convert base 10 to hexadecimal.
  let hexed = new BN(basedHashOne + basedHashTwo, 16).toString(16);


	console.log("zokrates compute-witness -a", paddedAddressSender.slice(0,77),
	paddedAddressSender.slice(77,), paddedAddressReceiver.slice(0,77),
	paddedAddressReceiver.slice(77,), basedHashOne, basedHashTwo,
	privateSender, cmd.slice(0,39), cmd.slice(39,), 0, 0, privateReceiver
	);
