pragma solidity ^0.4.11;

// @title ERC809 draft
// @author stevenLee <steven@booklocal.in>
// @date 1.6.17

// Overview of contents

    /** CONTRACTS ***

    PermissionedAccess....................sets company/hotel permissions
    RoomBase..............................defines attributes and methods for a room
    RoomOwnership.........................ERC-721 interface for ownership
    RoomRenting...........................ERC-809 interface for renting
    */

    /** VARIABLES ***

    MIN_RENT_TIME.........................uint256 seconds
    Room..................................struct for room state {price, renter, attributes}
    rooms.................................Room[]
    roomOwners_byIndex....................mapping(tokenId => owner)
    transferApproval_byIndex..............mapping(tokenId => address)
    numRooms_byOwner......................mapping(owner => numTokens)
    reservations..........................mapping(tokenId => mapping(time => address))
    */

    /** METHODS ***

    ### Non-Fungible ###
    totalSupply().........................get total supply
    ownerOf(tokenId)......................get owner of specific token
    transfer(to, tokenId).................transfer ownership
    transferFrom(from, to, tokenId).......transfer ownership on behalf of owner
    approve(to, tokenId)..................approve someone else to transfer token
    balanceOf(owner)......................find how many tokens someone owns

    ### Renting ###
    checkAvailable(tokenId, time).........check future availability of token
    getRoomInfo(tokenId)..................get information about the room
    reserve(tokenId, start, stop).........reserve future access to token
    access(tokenId).......................access the token
    settle(tokenId).......................remove access and settle funds
    cancelReservation.....................cancel reservation

    ### Room ###
    addRoom(numBeds)......................add new room
    getCurrentTime(tokenId)...............get minRentTime for a specific room
    changeMinRental(tokenId, minRental)...change minimum rental unit for a token
    changeNumBeds(tokenId, numBeds).......change number of beds
    */

// @title PermissionedAccess
// @dev PermissionedAccess provides specific access controls
//          anyone in the administrative team.
contract PermissionedAccess {
    // Basic permission functionality.
    // Doesn't do anything with pauses but probably should to handle bugs

    // initalize address types
    address public ceo;
    address public cfo;
    address public coo;

    // allow contracts to pauses
    bool public paused = false;

    // modifier for only ceo
    modifier onlyCEO() {
        require(msg.sender == ceo);
        _;
    }

    // modifier for only cfo
    modifier onlyCFO() {
        require(msg.sender == cfo);
        _;
    }

    // modifier for only controls
    modifier onlyCOO() {
        require(msg.sender == coo);
        _;
    }

    modifier onlyCLevel() {

        require(
            msg.sender == ceo ||
            msg.sender == cfo ||
            msg.sender == coo
        );
        _;
    }

    modifier whenPaused {
        require(paused);
        _;
    }

    modifier whenNotPaused {
        require(!paused);
        _;
    }

    function PermissionedAccess() public {
        ceo = msg.sender;
    }

    // change ceo
    // only ceo can change ceo
    function setCEO(address _newCEO) external onlyCEO {
        require(_newCEO != address(0));
        ceo = _newCEO;
    }

    // change cfo
    // only ceo can change cfo
    function setCFO(address _newCFO) external onlyCEO {
        require(_newCFO != address(0));
        cfo = _newCFO;
    }

    // change coo
    // only ceo can change coo
    function setCOO(address _newCOO) external onlyCEO {
        require(_newCOO != address(0));
        coo = _newCOO;
    }

    // pause contract
    function pause() external onlyCLevel whenNotPaused {
        paused = true;
    }

    // unpause, only ceo
    function unPause() external onlyCEO whenPaused {
        paused = false;
    }
}

// Room base defines room attributes, stores the rooms, and adds new rooms
contract RoomBase is PermissionedAccess {

    /**
    Define variables
    */

    // @dev main Room strucutre
    struct Room {

        // owner
        address owner;

        // renter
        address renter;

        // min rental
        uint256 minRentTime;

        // identify number of beds
        uint16 numBeds;
    }

    // @dev init array of Room structs, called rooms
    Room[] public rooms;

    // @dev default minimum unit of rent is one day (in seconds)
    uint256 public MIN_RENT_TIME = 3600*24;

    // @dev mapping for "tokenId" assignment to owner
    mapping (uint256 => address) public roomOwners_byIndex;

    // @dev mapping to store total rooms owned
    mapping (address => uint256) public numRooms_byOwner;

    // @dev mapping for ERC721 approval to transfer
    mapping (uint256 => address) public transferApproval_byIndex;

    // @dev mapping for basic reservations
    mapping (uint256 => mapping (uint256 => address)) public reservations;

    /**
    Define Functions
    */
    function addRoom(uint16 _numBeds) external onlyCLevel returns (uint256) {

        address _owner = msg.sender;
        address _renter = address(0);
        uint256 _min = MIN_RENT_TIME;

        // create new Room struct and store to memory
        Room memory _room = Room({
            owner: _owner,
            renter: _renter,
            minRentTime: _min,
            numBeds: _numBeds
        });

        // push new room to rooms array
        uint256 roomId = rooms.push(_room) - 1;

        _transfer(0, _owner, roomId);

        return roomId;
    }

    function getNumBeds(uint256 _tokenId) external view returns (uint16 numBeds) {
        Room storage room = rooms[_tokenId];

        numBeds = room.numBeds;
    }

    function getRoomInfo(uint256 _tokenId)
        external
        view
        returns (address owner, address renter, uint256 minRentTime, uint16 numBeds)
        {
        Room storage room = rooms[_tokenId];

        owner = room.owner;
        renter = room.renter;
        minRentTime = room.minRentTime;
        numBeds = room.numBeds;
    }

    function changeMinRental(uint256 _tokenId, uint256 _newMin) external {
        Room storage room = rooms[_tokenId];
        require(msg.sender == room.owner);
        room.minRentTime = _newMin;
    }

    function changeNumBeds(uint256 _tokenId, uint16 _beds) external {
        Room storage room = rooms[_tokenId];
        require(msg.sender == room.owner);
        room.numBeds = _beds;
    }

    // get time
    function getCurrentTime(uint256 _tokenId) external view returns (uint256 _time) {
        Room storage room = rooms[_tokenId];
        uint256 minRent = room.minRentTime;
        _time = now/minRent;
    }

    // @dev internally transfer token to new owner
    function _transfer(address _from, address _to, uint256 _tokenId) internal {

        numRooms_byOwner[_to] ++;
        roomOwners_byIndex[_tokenId] = _to;

        Room storage r = rooms[_tokenId];
        r.owner = _to;

        if (_from != address(0)) {
            numRooms_byOwner[_from]--;
        }
    }
}

// Room ownership adds ERC-721 interface to the room base
contract RoomOwnership is RoomBase {

    /**
    Define ERC-721 functions
    */

    // @dev find number of rooms (i.e. number of tokens)
    function totalSupply() external view returns(uint256 supply){
        supply = rooms.length;
    }

    // @dev find owner of specific room
    function ownerOf(uint256 _tokenId) external view returns (address) {
        address owner = roomOwners_byIndex[_tokenId];
        require(owner != address(0));
        return owner;
    }

    function ownerOf_2(uint256 _tokenId) external view returns (address owner) {
        Room storage r = rooms[_tokenId];
        owner = r.owner;
    }

    // @dev find total rooms owned by an address
    function balanceOf(address _owner) public view returns (uint256 count) {
        count = numRooms_byOwner[_owner];
        return(count);
    }

    // @dev transfer
    function transfer(address _to, uint256 _tokenId) external {

        // require _to isn't something stupid
        require(_to != address(0));
        require(_to != address(this));

        // make sure that the message sender actually owns token
        require(_owns(msg.sender, _tokenId));

        // transfer
        _transfer(msg.sender, _to, _tokenId);
    }

    // @dev approval for room transfers
    function approve(address _to, uint256 _tokenId) external {
        require(_owns(msg.sender, _tokenId));
        _approve(_tokenId, _to);
    }

    // @dev transfer from approved address
    function transferFrom(address _from, address _to, uint256 _tokenId) external {
        require (_to != address(0));
        require (_to != address(this));
        require (_approvedFor(msg.sender, _tokenId));
        require (_owns(_from, _tokenId));

        _transfer(_from, _to, _tokenId);
    }

    // @dev internally confirm owner of token
    function _owns(address _claimant, uint256 _tokenId) internal view returns(bool) {
        return roomOwners_byIndex[_tokenId] == _claimant;
    }

    // @dev internal approval function
    function _approve(uint256 _tokenId, address _approved) internal {
        transferApproval_byIndex[_tokenId] = _approved;
    }

    // @dev internal check approval
    function _approvedFor(address _claimer, uint256 _tokenId) internal view returns(bool) {
        return transferApproval_byIndex[_tokenId] == _claimer;
    }

    // @dev internal check if reservation date is _isFuture
    function _isFuture(uint256 _time) internal view returns (bool future) {
        uint256 _now = now/MIN_RENT_TIME;

        return _time>_now;
    }
}

// room renting adds ERC-809 renting interface to room ownership
contract RoomRenting is RoomOwnership {

    // constructor sets the ceo of bookLocal
    function RoomRenting() public {
        ceo = msg.sender;
    }

    /**
    Define ERC-809 functions
    */

    // @dev reserve future access to an asset
    function reserve(uint256 _tokenId, uint256 _start, uint256 _stop) external returns (bool){
        address guest = msg.sender;

        // comment out for debug and testing
        // require(_isFuture(_start));
        require(_start<_stop);

        // check availability (for all dates in range)
        for (uint i = _start; i <= _stop; i ++) {
            if (! _isAvailable(_tokenId, i)) {
                return false;
            }
        }

        // make reservation
        for (i = _start; i <= _stop; i ++) {
            reservations[_tokenId][i] = guest;
        }

        return true;
    }

    // @dev access your asset
    function access(uint256 _tokenId) external {

        // convert time to minimum rental units
        Room storage room = rooms[_tokenId];
        uint256 minRentTime = room.minRentTime;
        uint256 _time = now/minRentTime;

        // require permissions
        // 1) owner
        // 2) reserved guest
        require(msg.sender == reservations[_tokenId][_time] || msg.sender == roomOwners_byIndex[_tokenId]);
        room.renter = reservations[_tokenId][_time];
    }

    // @dev settle
    function settle(uint256 _tokenId) external {

        Room storage room = rooms[_tokenId];

        address renter = room.renter;

        if (msg.sender == roomOwners_byIndex[_tokenId] || msg.sender == renter) {
            room.renter = address(0);
        }
    }

    // @dev cancel reservation
    function cancelReservation(uint256 _tokenId, uint256 _start, uint256 _stop) external {

        // only cancle future reservations
        require(_isFuture(_start));
        require(_start<_stop);

        // only room owner or renter address can cancel
        if (msg.sender != roomOwners_byIndex[_tokenId]) {
            for (uint i = _start; i <= _stop; i ++) {
                require(msg.sender == _getRenter(_tokenId, i));
            }
        }

        for (i = _start; i <= _stop; i ++) {
            delete(reservations[_tokenId][i]);
        }
    }

    // @dev lookup function
    function checkAvailable(uint256 _tokenId, uint256 _date) external view returns (bool) {
        return reservations[_tokenId][_date] == address(0);
    }

    // @dev internal check if reservation date is _isFuture
    function _isFuture(uint256 _time) internal view returns (bool future) {
        uint256 _now = now/MIN_RENT_TIME;

        return _time>_now;
    }

    // @dev check availability
    function _isAvailable(uint256 _tokenId, uint256 _time) internal view returns (bool) {
        return reservations[_tokenId][_time] == address(0);
    }

    // @dev find renter of token at specific time
    function _getRenter(uint256 _tokenId, uint256 _time)
        internal
        view
        returns (address _renter)
        {

        _renter = reservations[_tokenId][_time];
        }
}
