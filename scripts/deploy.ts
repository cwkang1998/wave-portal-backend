/* eslint-disable no-process-exit */
import { ethers } from "hardhat";
const main = async () => {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const Token = await ethers.getContractFactory("WavePortal");
  const portal = await Token.deploy({
    value: ethers.utils.parseEther("0.001"),
  });
  await portal.deployed();

  console.log("WavePortal address: ", portal.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runMain();
