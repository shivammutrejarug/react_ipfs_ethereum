Steps to check if the application is working fine :

1. Install ganache to use as test blockchain network.
2. Change ganache port to 8545 for Metamask to catch or create a new network on Metamask. (Optional)
3. Import two accounts from Ganache to MetaMask by copying the private key to MetaMask.
4. Clone the repo and install packages
```
git clone https://github.com/shivammutrejarug/react_ipfs_ethereum.git
cd react_ipfs_ethereum/client
npm install . 
```
5. If you haven't made changes as suggested in step 2, change the port to 7545 i.e the default ganache port in truffle-config.js 
6. Deploy the contract and run tests.
```
truffle migrate \\this will deploy the contract on the blockchain.
truffle test \\run test cases.
```
If all test cases pass, the code is good. 


Steps to replicate : 

1. Follow first 4 steps from the previous section. 
2. Remove verifier.sol from the contracts folder.
3. Copy verificationTest.js from the test folder to a tmp location.
4. Comment lines 2 and 6 in the 2_deploy_contracts.js file indside migrations folder.
5. Go to the client folder and run `npm run start`. This should automatically open the browser. If not, open the browser and go to `http://localhost:3000`.
6. There will be two forms on the view. Fill the second form with the asked details and press submit. This will take you to the MetaMask page and you'll have to confirm the transcation.
7. Once the transaction is successfull, the page will reaload and you'll see your file on the view. 
8. Now that we have the NFT on the blockchain. Let's transfer this to another user. Use the first form on the view and fill the owner's (your) address and the receiver's address. Submit.
9. This will take you to the MetaMask page and you'll have to confirm the transcation. Once the transaction is successfull, you can be sure that the NFT was shared. If you want to check, you can go open the truffle console and fetch to the deployed contract and call the ownerOf function with the argument as the tokenId.

```
let instance = await User.deployed()
instance.contract.methods.totalSupply().call() 
instance.contract.methods.ownerOf(2).call()
```

10. Now that we have transferred the file, we need to prove to the receiver that we own the NFT and that the owner has shared the NFT with him.

Steps 11 through 18 can be achieved by running the file test_bash.sh

11. Make sure you are in the `react_ipfs_ethereum` directory. Now move to get_hash directory `cd get_hash`. Run `zokrates compile -i create_hash.zok`. 
12. Run `node getIpfsHashParams.js <your-ipfs-hash>`. This will give you the command you need to run to generate the witness with zokrates compatible arguments.
13. Run the command from the previous step and copy the output.
14. Now, move down the directory `cd ..` to `react_ipfs_ethereum` and run `zokrates compile -i root.zok`.
15. Run `zokrates setup`. This will provide us with the proving key and the verification key which will be used in the generating the proof.
16. Run `zokrates export-verifier`. This will provide us with the `verifier.sol` file which will be deployed on-chain later.
17. Run `node getParams.js <your-private-key> <random-private-key> <your-ipfs-hash> <first-of-two-copied-strings> <second-of-two-copied-strings>`.
18. You'll receive the command to run the witness. Run that command. Now uncomment lines commented in step 4. 

19. Run `zokrates generate-proof`. This will give a file with name proof.json which will be used to fetch the arguments for `verifyTx` function in `verifier.sol`
19. Copy the verifier.sol to contracts folder and copy verificationTest.js from tmp folder to test.
20. Run `truffle migrate --network development`.
21. Run `truffle test`. If all test cases pass, the verifier can be sure that the proof is genuine.




See it in action - https://youtu.be/oFQHVCS8D1A


