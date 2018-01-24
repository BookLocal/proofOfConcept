var PermissionedAccess = artifacts.require("./PermissionedAccess.sol");
var RoomBase = artifacts.require("./RoomBase.sol");
var RoomOwnership = artifacts.require('./RoomOwnership.sol');
var RoomRenting = artifacts.require('./RoomRenting.sol');

module.exports = function(deployer) {
  deployer.deploy(PermissionedAccess);
  deployer.deploy(RoomBase);
  deployer.deploy(RoomOwnership);
  deployer.deploy(RoomRenting);
};
