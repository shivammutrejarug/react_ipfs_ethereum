
	var myArgs = process.argv.slice(2);
	console.log(myArgs);

	// Get private key from the user as arguments.
	const ipfsHash = myArgs[0];

  const BN = require('bn.js');

	// Make ipfs hash zokrates compatible
  let cmd = new BN(ipfsHash, 16).toString(10);
  console.log(cmd.length);
  console.log("Secret part 1", cmd.slice(0,39));
  console.log("Secret part 2", cmd.slice(39,));
  console.log("Secret part 3", 0);
  console.log("Secret part 4", 0);


	console.log("Command to run for witness in get_hash - \n zokrates compute-witness -a",
		cmd.slice(0,39), cmd.slice(39,), 0, 0
	);
