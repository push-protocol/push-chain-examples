// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/UniversalCounter.sol";

contract DeployCounter is Script {
    function run() external {
        vm.startBroadcast();
        new UniversalCounter();
        vm.stopBroadcast();
    }
}
