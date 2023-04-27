const { ethers } = require("hardhat");
const { expect } = require("chai");



describe("Governance", function () {
  let governance;
  let policy;
  let signer;
  let address;

  beforeEach(async function () {
    signer = await ethers.getSigner(0);
    address = await signer.address;
    const Governance = await ethers.getContractFactory("Governance");
    governance = await Governance.deploy();
    await governance.deployed();

    const Policy = await ethers.getContractFactory("Policy");
    policy = await Policy.deploy(await ethers.getSigner().address, 100, 1000, 30 * 24 * 60 * 60);
    await policy.deployed();
  });

  it("should add a policy", async function () {
    await governance.addPolicy(policy.address);
    expect(await governance.policies(policy.address)).to.equal(true);
  });

  it("should keep track of the total number of policies", async function () {
    await governance.addPolicy(policy.address);
    expect(await governance.getPolicyCount()).to.equal(1);
  });
});
