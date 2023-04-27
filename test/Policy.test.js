const { ethers } = require("hardhat");

const { expect } = require("chai");



describe("Policy", function () {
  let policy;
  let signer;
  let address;

  beforeEach(async function () {
    signer = await ethers.getSigner(0);
    address = await signer.address;
    const Policy = await ethers.getContractFactory("Policy");
    policy = await Policy.deploy(await ethers.getSigner().address, 100, 1000, 30 * 24 * 60 * 60);
    await policy.deployed();
  });

  it("should be deployed correctly", async function () {
    expect(await policy.insured()).to.equal(await ethers.getSigner().getAddress());
    expect(await policy.premium()).to.equal(100);
    expect(await policy.coverageAmount()).to.equal(1000);
    expect(await policy.duration()).to.equal(30 * 24 * 60 * 60);
  });

  // Continue from where we left off
  it("should be active after being created", async function () {
    expect(await policy.isActive()).to.equal(true);
  });

  it("should not be active after the duration has passed", async function () {
    await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60 + 1]);
    await ethers.provider.send("evm_mine");
    expect(await policy.isActive()).to.equal(false);
  });
});
