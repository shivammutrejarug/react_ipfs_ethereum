Steps to replicate :

1. Install ganache to use as test blockchain network.
2. Change ganache port to 8545 for Metamask to catch or create a new network on Metamask. (Optional)
3. Clone the repo and install packages
```
git clone https://github.com/shivammutrejarug/react_ipfs_ethereum.git
cd react_ipfs_ethereum
npm install . 
```
4. If you haven't made changes as suggested in step 2, change the port to 7545 i.e the default ganache port in truffle-config.js 
5. Deploy the contract and run tests.
```
truffle migrate \\this will deploy the contract on the blockchain.
truffle test \\run test cases.
```

See it in action - https://youtu.be/oFQHVCS8D1A


