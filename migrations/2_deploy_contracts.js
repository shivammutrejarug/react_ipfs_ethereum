var Users = artifacts.require("./Users.sol");
var Verifier = artifacts.require("./verifier.sol");

module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(Verifier);
};
