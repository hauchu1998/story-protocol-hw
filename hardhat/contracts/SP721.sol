// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IPARegistrar.sol";
import "./interface/IIPARegistrar.sol";

// SP721 story protocol erc721
contract SP721 is ERC721, Ownable, ERC721Enumerable {
    IIPARegistrar public ipaRegistrar;

    uint256 private _nextTokenId;
    mapping(uint256 => string) private _uris;

    string public constant DEFAULT_URI =
        "https://cloudflare-ipfs.com/ipfs/QmRibyKgMy5iK2VmhgNYwdhDJBr795ji3eozk9nPYmU9oU/steamboat-willie.jpg";

    constructor(address ipAddress) ERC721("SP NFT", "SP721") Ownable(_msgSender()) {
        ipaRegistrar = IIPARegistrar(ipAddress);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal virtual override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function mint() public returns (uint256 tokenId) {
        tokenId = ++_nextTokenId;
        _mint(_msgSender(), tokenId);
        _uris[tokenId] = DEFAULT_URI;
    }

    function mintWithUri(string memory uri) public returns (uint256 tokenId) {
        tokenId = ++_nextTokenId;
        _mint(_msgSender(), tokenId);
        _uris[tokenId] = uri;
    }

    function mintAndRegisterIP(string memory ipName) public returns (uint256 tokenId) {
        tokenId = mint();
        registerIP(tokenId, ipName);
    }

    function mintWithUriAndRegisterIP(string memory ipName, string memory uri) public returns (uint256 tokenId) {
        tokenId = mintWithUri(uri);
        registerIP(tokenId, ipName);
    }

    function registerIP(uint256 tokenId, string memory ipName) public {
        _requireOwned(tokenId);
        ipaRegistrar.register(ipName, address(this), tokenId);
    }

    function burn(uint256 tokenId) public {
        _burn(tokenId);
        delete _uris[tokenId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return _uris[tokenId];
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
