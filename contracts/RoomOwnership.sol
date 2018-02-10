pragma solidity ^0.4.17;

import './RoomBase.sol';

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
