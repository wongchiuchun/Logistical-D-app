// migrating the appropriate contracts
var Roles = artifacts.require("./Roles.sol");
var FarmerRole = artifacts.require("./FarmerRole.sol");
var WholesalerRole = artifacts.require("./WholesalerRole.sol");
var RetailerRole = artifacts.require("./RetailerRole.sol");
var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");
var Ownable = artifacts.require("./Ownable.sol");





module.exports = function(deployer) {
  deployer.deploy(Roles);
  deployer.link(Roles,[FarmerRole,WholesalerRole,RetailerRole,ConsumerRole])
  deployer.deploy(FarmerRole);
  deployer.deploy(WholesalerRole);
  deployer.deploy(RetailerRole);
  deployer.deploy(ConsumerRole);
  deployer.deploy(Ownable);
  deployer.deploy(SupplyChain);
};
