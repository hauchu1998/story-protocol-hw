import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

const IPAssetRegistrty = "0x292639452A975630802C17c9267169D93BD5a793";
const IPResolver = "0x3809f4128B0B33AFb17576edafD7D4F4E2ABE933";

describe("SP721", function () {
  async function deployContractFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const IPARegistry = await ethers.deployContract("IPARegistrar", [IPAssetRegistrty, IPResolver]);
    await IPARegistry.waitForDeployment();
    const IPARegistry_Address = await IPARegistry.getAddress();

    const SP721 = await ethers.deployContract("SP721", [IPARegistry_Address]);
    await SP721.waitForDeployment();
    const SP721_Address = await SP721.getAddress();

    return {
      owner,
      addr1,
      addr2,
      IPARegistry,
      IPARegistry_Address,
      SP721,
      SP721_Address,
    };
  }

  describe("Mint", function () {
    // it("mint", async function () {
    //   const { addr1, SP721 } = await loadFixture(deployContractFixture);
    //   await SP721.connect(addr1).mint();

    //   expect(await SP721.ownerOf(1)).to.equal(addr1.address);
    //   expect(await SP721.balanceOf(addr1.address)).to.equal(1);
    //   expect(await SP721.tokenOfOwnerByIndex(addr1.address, 0)).to.equal(1);
    //   expect(await SP721.totalSupply()).to.equal(1);
    //   expect(await SP721.tokenURI(1)).to.equal(
    //     "https://cloudflare-ipfs.com/ipfs/QmRibyKgMy5iK2VmhgNYwdhDJBr795ji3eozk9nPYmU9oU/steamboat-willie.jpg",
    //   );
    // });

    it("mintWithUrI", async function () {
      const { addr1, addr2, SP721 } = await loadFixture(deployContractFixture);
      await SP721.connect(addr1).mintWithUri("https://www.google.com");
      await SP721.connect(addr2).mint();
      await SP721.connect(addr1).mintAndRegisterIP("TestIP");
      await SP721.connect(addr1).mintWithUriAndRegisterIP("TestIP2", "https://www.twitter.com");

      expect(await SP721.ownerOf(1)).to.equal(addr1.address);
      expect(await SP721.balanceOf(addr1.address)).to.equal(3);
      expect(await SP721.tokenOfOwnerByIndex(addr1.address, 0)).to.equal(1);
      expect(await SP721.tokenOfOwnerByIndex(addr1.address, 1)).to.equal(3);
      expect(await SP721.tokenOfOwnerByIndex(addr1.address, 2)).to.equal(4);
      expect(await SP721.totalSupply()).to.equal(4);
      expect(await SP721.tokenURI(1)).to.equal("https://www.google.com");
      expect(await SP721.tokenURI(4)).to.equal("https://www.twitter.com");
    });
  });
});
