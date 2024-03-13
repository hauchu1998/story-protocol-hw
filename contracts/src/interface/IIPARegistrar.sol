// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IIPARegistrar {
    function register(
        string memory ipName,
        address tokenAddress,
        uint256 tokenId
    ) external returns (address);
}
