// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

struct UniversalAccount {
    string chain; // Chain identifier of the owner account (e.g., "eip155:1")
    bytes owner; // Owner's public key or address in bytes format
}
interface IUEAFactory {
     /**
     * @dev Returns the owner key (UOA) for a given UEA address
     * @param _uea The UEA address
     * @return The owner key associated with this UEA
     */
    function getOriginForUEA(address _uea) external view returns (UniversalAccount memory);
}

contract UniversalCounter {

    uint256 public countEth;
    uint256 public countSol;
    uint256 public countPC;

    event CountIncremented(uint256 countValue, address uea, string origin);

    constructor() {}

    function increment() public {
        address uea = msg.sender;
        UniversalAccount memory originAccount = IUEAFactory(0x00000000000000000000000000000000000000eA).getOriginForUEA(uea);
        bytes32 chainHash = keccak256(abi.encodePacked(originAccount.chain));

        if (chainHash == keccak256(abi.encodePacked("solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"))) {
            countSol += 1;
        } else if (chainHash == keccak256(abi.encodePacked("eip155:11155111"))) {
            countEth += 1;
        } else if (chainHash == keccak256(abi.encodePacked("eip155:42101"))) {
            countPC += 1;
        } else {
            revert("Invalid chain");
        }

        emit CountIncremented(getCount(), uea, originAccount.chain);
    }

    function reset() public {
        
        countEth = 0;countSol = 0; countPC = 0;
    }

    function getCount() public view returns (uint256) {
        return countEth + countSol + countPC;
    }
}