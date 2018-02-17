var RoomRenting = artifacts.require("./RoomRenting.sol");

contract('RoomRenting', function(accounts) {

  it("...should have 2 beds.", function() {
    return RoomRenting.deployed({from: accounts[0]}).then(function(instance) {
      roomRentingInstance = instance;

      return roomRentingInstance.addRoom(2, {from: accounts[0]});
    }).then(function() {
      return roomRentingInstance.getNumBeds(0);
  }).then(function(numBeds) {
      assert.equal(numBeds, 2, "The room does not have 2 beds.");
    });
  });

});
