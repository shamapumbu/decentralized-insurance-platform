// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Claims {
    struct Claim {
        address claimant;
        string reason;
        uint256 votesFor;
        uint256 votesAgainst;
        bool resolved;
    }

    Claim[] public claims;

    // Create a new claim
    function createClaim(address claimant, string calldata reason) external {
        claims.push(Claim(claimant, reason, 0, 0, false));
    }

    // Vote on a claim
    function vote(address voter, uint256 claimId, bool approved) external {
        require(!claims[claimId].resolved, "Claim has already been resolved.");
        if (approved) {
            claims[claimId].votesFor++;
        } else {
            claims[claimId].votesAgainst++;
        }
    }

    // Get the total number of claims
    function getClaimCount() external view returns (uint256) {
        return claims.length;
    }
}
