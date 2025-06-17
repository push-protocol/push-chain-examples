pragma solidity ^0.8.0;
import "forge-std/Test.sol";
import "../src/UniversalCounter.sol";

contract UniversalCounterTest is Test {
    UniversalCounter universalCounter;

    function setUp() public {
        universalCounter = new UniversalCounter();
    }

    function testInitialCount() public {
        assertEq(universalCounter.countEth(), 0);
        assertEq(universalCounter.countSol(), 0);
        assertEq(universalCounter.countPC(), 0);
    }

    function testIncrement() public {
        universalCounter.increment();
        assertEq(universalCounter.countPC(), 1);
    }

    function testReset() public {
        universalCounter.increment();
        universalCounter.reset();
        
        assertEq(universalCounter.countEth(), 0);
        assertEq(universalCounter.countSol(), 0);
        assertEq(universalCounter.countPC(), 0);
    }
}
