var RoomRenting = artifacts.require('./RoomRenting.sol');

module.exports = function(deployer) {
  deployer.deploy(RoomRenting);
};
