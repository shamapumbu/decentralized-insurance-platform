// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Policy.sol";
import "./Claims.sol";
import "./Governance.sol";

contract InsurancePlatform {
    address public governance;

    // Initialize the governance contract
    constructor() {
        governance = address(new Governance());
    }

    // Create a new policy
    function createPolicy(uint256 premium, uint256 coverageAmount, uint256 duration) external returns (address) {
        address policyAddress = address(new Policy(msg.sender, premium, coverageAmount, duration));
        Governance(governance).addPolicy(policyAddress);
        return policyAddress;
    }

    // Submit a claim
    function submitClaim(address policyAddress, string calldata reason) external {
        Claims claims = Claims(Policy(policyAddress).claims());
        claims.createClaim(msg.sender, reason);
    }

    // Vote on a claim
    function voteOnClaim(address policyAddress, uint256 claimId, bool approved) external {
        Claims claims = Claims(Policy(policyAddress).claims());
        claims.vote(msg.sender, claimId, approved);
    }
}
