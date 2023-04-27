// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Claims.sol";

contract Policy {
    address public insured;
    uint256 public premium;
    uint256 public coverageAmount;
    uint256 public duration;
    uint256 public endTime;
    address public claims;

    // Initialize the policy
    constructor(address _insured, uint256 _premium, uint256 _coverageAmount, uint256 _duration) {
        insured = _insured;
        premium = _premium;
        coverageAmount = _coverageAmount;
        duration = _duration;
        endTime = block.timestamp + _duration;
        claims = address(new Claims());
    }

    // Check if the policy is active
    function isActive() external view returns (bool) {
        return block.timestamp < endTime;
    }
}
