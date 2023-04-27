// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Governance {
    mapping(address => bool) public policies;
    address[] public policyAddresses;

    // Add a policy to the governance contract
    function addPolicy(address policy) external {
        policies[policy] = true;
        policyAddresses.push(policy);
    }

    // Get the total number of policies
    function getPolicyCount() external view returns (uint256) {
        return policyAddresses.length;
    }
}
