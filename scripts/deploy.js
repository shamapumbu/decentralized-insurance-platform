async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const InsurancePlatform = await ethers.getContractFactory("InsurancePlatform");
    const insurancePlatform = await InsurancePlatform.deploy();
    console.log("InsurancePlatform deployed at:", insurancePlatform.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  