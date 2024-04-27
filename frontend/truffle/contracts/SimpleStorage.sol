// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    struct Data {
        int256 pos; 
        int256 neg; 
        int256 grd; 
        int256 brk; 
    }
    Data[] public value;
    address public contractAddress;
    address public station1;
    address public station2;

    constructor() {
        contractAddress = address(this);
    }

    function toString(address _addr) internal pure returns (string memory) {
        bytes32 val = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = "0";
        str[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(val[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(val[i + 12] & 0x0f)];
        }

        return string(str);
    }

    function getContractAddress() public view returns (string memory) {
        return toString(contractAddress);
    }

    function read() public view returns (Data[] memory) {
        require(
            msg.sender == station1 || msg.sender == station2,
            "Unauthorized"
        );
        return value;
    }

    function write(int256 val1, int256 val2, int256 val3, int256 val4) public {
        require(
            msg.sender == station1 || msg.sender == station2,
            "Unauthorized"
        );
        Data memory temp;
        temp.pos = val1;
        temp.neg = val2;
        temp.grd = val3;
        temp.brk = val4;
        value.push(temp);
    }

    function setStations(address s1, address s2) public {
        station1 = s1;
        station2 = s2;
    }

    // function executeWrite(int256 newValue, uint8 v, bytes32 r, bytes32 s) public {
    //     require(msg.sender == station1 || msg.sender == station2, "Unauthorized");
    //     require(ecrecover(keccak256(abi.encodePacked(address(this), newValue)), v, r, s) == station1 || ecrecover(keccak256(abi.encodePacked(address(this), newValue)), v, r, s) == station2, "Invalid signature");
    //     write(newValue);
    // }
}