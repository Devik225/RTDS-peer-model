// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.19;

contract test{
    uint number;
    function set(uint number_) public {
        number = number_;
    }

    function get() public view returns(uint){
        return number;
    }
}