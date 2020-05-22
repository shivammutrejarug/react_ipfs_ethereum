var User = artifacts.require("./User.sol");

module.exports = function(deployer) {
  deployer.deploy(User);
};
