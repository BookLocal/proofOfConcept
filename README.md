This is a truffle compiled project file.  It is not safe to merge until "safe" absolute paths are established.

In order to call methods of PermissionedAccess, assign it to PA with this line:
PermissionedAccess.deployed().then(function(res){PA = PermissionedAccess.at(res.address)})

In order to call methods of RoomBase, assign it to RB with this line:
RoomBase.deployed().then(function(res){RB = RoomBase.at(res.address)})

In order to call methods of RoomOwnership, assign it to RO with this line:
RoomOwnership.deployed().then(function(res){RO = RoomOwnership.at(res.address)})

In order to call methods of RoomRenting, assign it to RR with this line:
RoomRenting.deployed().then(function(res){RR = RoomRenting.at(res.address)})
