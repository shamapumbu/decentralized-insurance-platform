const { ethers } = require("hardhat");

const { expect } = require("chai");



describe("Claims", function () {
  let claims;
  let signer;
  let address;

  beforeEach(async function () {
    signer = await ethers.getSigner(0);
    address = await signer.address;
    const Claims = await ethers.getContractFactory("Claims");
    claims = await Claims.deploy();
    await claims.deployed();
  });

  it("should create a new claim", async function () {
    await claims.createClaim(await ethers.getSigner().address, "Test claim");
    const claim = await claims.claims(0);
    expect(claim.claimant).to.equal(await ethers.getSigner().getAddress());
    expect(claim.reason).to.equal("Test claim");
  });

  it("should vote on a claim", async function () {
    await claims.createClaim(await ethers.getSigner().address, "Test claim");
    await claims.vote(await ethers.getSigner().getAddress(), 0, true);
    const claim = await claims.claims(0);
    expect(claim.votesFor).to.equal(1);
  });
});
