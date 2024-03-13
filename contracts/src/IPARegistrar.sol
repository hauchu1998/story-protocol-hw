// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {IP} from "@story-protocol/protocol-core/contracts/lib/IP.sol";
import {IPAssetRegistry} from "@story-protocol/protocol-core/contracts/registries/IPAssetRegistry.sol";
import {IPResolver} from "@story-protocol/protocol-core/contracts/resolvers/IPResolver.sol";

contract IPARegistrar {
    uint256 public constant MIN_ROYALTY = 10;
    bytes ROYALTY_CONTEXT = "";
    address public immutable IP_RESOLVER;
    IPAssetRegistry public immutable IPA_REGISTRY;

    constructor(address ipAssetRegistry, address resolver) {
        IPA_REGISTRY = IPAssetRegistry(ipAssetRegistry);
        IP_RESOLVER = resolver;
    }

    function register(
        string memory ipName,
        address tokenAddress,
        uint256 tokenId
    ) external returns (address) {
        bytes memory metadata = abi.encode(
            IP.MetadataV1({
                name: ipName,
                hash: "",
                registrationDate: uint64(block.timestamp),
                registrant: msg.sender,
                uri: ""
            })
        );
        return
            IPA_REGISTRY.register(
                block.chainid,
                tokenAddress,
                tokenId,
                IP_RESOLVER,
                true,
                metadata
            );
    }
}
