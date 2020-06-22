
const verifier = artifacts.require("./verifier.sol");
const fs = require('fs');
const BN = require('bn.js');

contract('verifier', function(accounts) {
  it('verifyTx', async function() {
    // Fetch proof and inputs from proof.json file
    var p = require("../proof.json").proof;
    var i = require("../proof.json").inputs;

    let instance = await verifier.deployed();
    console.log('calling verifyTx with proof', p.a, p.b, p.c, i);
    // verifyTx takes 4 arguments, 3 arrays from proof and the inputs array.
    const success = await instance.verifyTx.call(p.a, p.b, p.c, i);
    assert(success);
  })
})
