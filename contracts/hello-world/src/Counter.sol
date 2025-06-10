// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;

    constructor(uint256 _start) {
        count = _start;
    }

    function increment() public {
        count += 1;
    }

    function reset() public {
        count = 0;
    }
}
