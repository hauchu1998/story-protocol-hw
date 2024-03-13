// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {stdJson} from "forge-std/Script.sol";
import {Test} from "forge-std/Test.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {IPAssetRegistry} from "@story-protocol/protocol-core/contracts/registries/IPAssetRegistry.sol";
import {IPResolver} from "@story-protocol/protocol-core/contracts/resolvers/IPResolver.sol";

import {IPARegistrar} from "../src/IPARegistrar.sol";
import {SP721} from "../src/SP721.sol";

contract IPARegistrarTest is Test {
    using stdJson for string;

    address internal ipAssetRegistryAddr;
    address internal licensingModuleAddr;
    address internal ipResolverAddr;

    SP721 public nft;
    IPARegistrar public ipaRegistrar;

    function setUp() public {
        _readProtocolAddresses();
        ipaRegistrar = new IPARegistrar(ipAssetRegistryAddr, ipResolverAddr);
        nft = new SP721(address(ipaRegistrar));
    }

    function test_IPARegistration() public {
        vm.startPrank(address(ipaRegistrar));
        // uint256 tokenId = nft.mint();
        // ipaRegistrar.register(
        //     string.concat("SP721 NFT #", Strings.toString(tokenId)),
        //     address(nft),
        //     tokenId
        // );
        uint256 tokenId = nft.mintAndRegisterIP("SP721 NFT #0");
        assertEq(tokenId, 1);
        uint256 tokenId2 = nft.mintWithUriAndRegisterIP(
            "SP721 NFT #1",
            "https://example.com"
        );
        assertEq(tokenId2, 2);
    }

    function _readProtocolAddresses() internal {
        string memory root = vm.projectRoot();
        string memory path = string.concat(
            root,
            "/node_modules/@story-protocol/protocol-core/deploy-out/deployment-11155111.json"
        );
        string memory json = vm.readFile(path);
        ipAssetRegistryAddr = json.readAddress(".main.IPAssetRegistry");
        ipResolverAddr = json.readAddress(".main.IPResolver");
    }
}
