pragma solidity ^0.8.0;
import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
    Counter counter;

    function setUp() public {
        counter = new Counter(0);
    }

    function testInitialCount() public {
        assertEq(counter.count(), 0);
    }

    function testIncrement() public {
        counter.increment();
        assertEq(counter.count(), 1);
    }

    function testReset() public {
        counter.increment();
        counter.reset();
        assertEq(counter.count(), 0);
    }
}
