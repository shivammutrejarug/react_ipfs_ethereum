var User = artifacts.require("./User.sol");
var Verifier = artifacts.require("./verifier.sol");

module.exports = function(deployer) {
  deployer.deploy(User);
  deployer.deploy(Verifier);
};
