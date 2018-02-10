pragma solidity ^0.4.17;

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

    function getCLevel() external view returns (
        
        address _ceo,
        address _cfo,
        address _coo)
        {
            _ceo = ceo;
            _cfo = cfo;
            _coo = coo;
        }
}
