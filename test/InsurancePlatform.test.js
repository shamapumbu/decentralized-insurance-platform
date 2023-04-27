const { ethers } = require("hardhat");

const { expect } = require("chai");



describe("InsurancePlatform", function () {
  let insurancePlatform;
  let governance;
  let policy;
  let signer;
  let address;

  beforeEach(async function () {
    signer = await ethers.getSigner(0);
    address = await signer.address;
    const InsurancePlatform = await ethers.getContractFactory("InsurancePlatform");
    insurancePlatform = await InsurancePlatform.deploy();
    await insurancePlatform.deployed();
    governance = await insurancePlatform.governance();
  });

  it("should deploy and work as expected", async function () {
    expect(governance).to.not.equal(ethers.constants.AddressZero);
  });

  it("should create a new policy", async function () {
    const policyAddress = await insurancePlatform.createPolicy(100, 1000, 30 * 24 * 60 * 60);
    policy = await ethers.getContractAt("Policy", policyAddress);
    expect(await policy.insured()).to.equal(await insurancePlatform.signer.getAddress());
  });

  it("should submit a claim", async function () {
    // Create a policy and retrieve the Claims contract address
    const policyAddress = await insurancePlatform.createPolicy(100, 1000, 30 * 24 * 60 * 60);
    policy = await ethers.getContractAt("Policy", policyAddress);
    const claimsAddress = await policy.claims();
    const claims = await ethers.getContractAt("Claims", claimsAddress);

    // Submit a claim
    await insurancePlatform.submitClaim(policyAddress, "Test claim");

    // Check that the claim is registered
    const claim = await claims.claims(0);
    expect(claim.reason).to.equal("Test claim");
  });

  it("should vote on a claim", async function () {
    // Create a policy, submit a claim, and retrieve the Claims contract address
    const policyAddress = await insurancePlatform.createPolicy(100, 1000, 30 * 24 * 60 * 60);
    policy = await ethers.getContractAt("Policy", policyAddress);
    const claimsAddress = await policy.claims();
    const claims = await ethers.getContractAt("Claims", claimsAddress);
    await insurancePlatform.submitClaim(policyAddress, "Test claim");

    // Vote on the claim
    await insurancePlatform.voteOnClaim(policyAddress, 0, true);

    // Check that the vote has been registered
    const claim = await claims.claims(0);
    expect(claim.votesFor).to.equal(1);
  });
});
