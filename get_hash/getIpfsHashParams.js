
	var myArgs = process.argv.slice(2);

	// Get private key from the user as arguments.
	const ipfsHash = myArgs[0];

  const BN = require('bn.js');

	// Make ipfs hash zokrates compatible
  let cmd = new BN(ipfsHash, 16).toString(10);

	console.log("zokrates compute-witness -a ", cmd.slice(0,39), cmd.slice(39,), 0, 0)
