pragma solidity ^0.4.17;

import './RoomOwnership.sol';


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

    ### Temporary for EthMemphis ###
    addAccessCode(bytes32)................add new access code for ethMemphis aplicants
    getNumberOfAccessCodes()..............see total outstanding access codes

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
    reserve(tokenId, start, stop, accessCode).........reserve future access to token
    access(tokenId).......................access the token
    settle(tokenId).......................remove access and settle funds
    cancelReservation.....................cancel reservation

    ### Room ###
    addRoom(numBeds)......................add new room
    getCurrentTime(tokenId)...............get minRentTime for a specific room
    changeMinRental(tokenId, minRental)...change minimum rental unit for a token
    changeNumBeds(tokenId, numBeds).......change number of beds
    */

// room renting adds ERC-809 renting interface to room ownership
contract RoomRenting is RoomOwnership {

    /**
        STORAGE
    */

    address[] accessCodes;

    /**
        CONSTRUCTOR
    */

    //sets the ceo of bookLocal
    function RoomRenting() public {
        ceo = msg.sender;
    }

    /**
        MODIFIERS
    */

    // only let a guests with valid access code reserve the room
    modifier onlyEthMemphis() {
        address _guest = msg.sender;
        require(_validAccessCode(_guest));
        _;
    }

    /**
        TEMPORARY FUNCTIONS
    */

    /// *** ADD ACCESS CODE *** \\\
    /// only left here for use at ETH memephis
    /// will remove for future versions
    function addAccessCode(address[] _accessCodes) external onlyCLevel {

        for (uint i=0; i<_accessCodes.length; i++) {
            accessCodes.push(_accessCodes[i]);
        }

    }

    function getNumberOfAccessCodes() external view returns (uint256 _codesLeft) {
        _codesLeft = accessCodes.length;
    }

    function _validAccessCode(address _accessCode) internal view returns (bool){
        for (uint i=0; i<accessCodes.length; i++) {
            if (_accessCode == accessCodes[i]) {
                return true;
            }
        }
        return false;
    }

    function _removeAccessCode(address _accessCode) internal returns(bool) {

        uint256 _index;
        bool _valid = false;

        for (uint i=0; i<accessCodes.length; i++) {
            if (_accessCode == accessCodes[i]) {
                _index = i;
                _valid = true;
            }
        }

        if (_valid) {
            _remove(_index);
        } else {
            return false;
        }
    }

    function _remove(uint256 _index) internal returns(bool) {
        require(_index <= accessCodes.length-1);

        for (uint i = _index; i<accessCodes.length-1; i++){
            accessCodes[i] = accessCodes[i+1];
        }
        delete accessCodes[accessCodes.length-1];
        accessCodes.length--;
        return true;
    }

    /**
       ERC-809 FUNCTIONS
    */

    // @dev reserve future access to an asset
    function reserve(uint256 _tokenId, uint256 _start, uint256 _stop)

    external
    onlyEthMemphis()

    returns (bool)
    {
        address _guest = msg.sender;

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
            reservations[_tokenId][i] = _guest;
        }

        _removeAccessCode(_guest);

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

    /**
        INTERNAL FUNCTIONS
    */

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
