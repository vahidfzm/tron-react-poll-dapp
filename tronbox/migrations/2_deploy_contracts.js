var TronPollDapp = artifacts.require("./TronPollDapp.sol");
var TronPollToken = artifacts.require("./TronPollToken.sol");

module.exports = function(deployer) {
  deployer.deploy(TronPollDapp);
  deployer.deploy(TronPollToken);
};
