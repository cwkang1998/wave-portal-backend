/* eslint-disable no-process-exit */
import { ethers } from "hardhat";

const main = async () => {
  const [owner] = await ethers.getSigners();

  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  let contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  const waveTxn1 = await waveContract.wave("Wave #1");
  await waveTxn1.wait();

  const waveTxn2 = await waveContract.wave("Wave #2");
  await waveTxn2.wait();

  contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  const allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
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
